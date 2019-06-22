from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http.response import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from .forms import UserLoginForm, Register
from restaurant import settings
from .models import User
# from restaurant.user.models import User
from django.http import JsonResponse
from user.models import User
import random,string,os
import webauthn.webauthn as webauthn


RP_ID = 'localhost'
ORIGIN = 'https://localhost:8000'
TRUST_ANCHOR_DIR = 'trusted_attestation_roots'

def login_user(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse_lazy('profile'))
        return render(request, 'accounts/login.html', {'form': UserLoginForm})
        pass
    elif request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse_lazy('profile'))
        # return HttpResponseRedirect(reverse('home'))
        else:
            return HttpResponse('invalid user')


def logout_user(request):

    logout(request)
    return HttpResponseRedirect(reverse_lazy('home'))


@login_required(redirect_field_name=reverse_lazy('login'))
def profile(request):
    user = request.user
    return render(request, 'accounts/profile.html', {
        'request': request,

    })


def register(request):
    if request.method == 'GET':
        return render(request, 'accounts/register.html', {
            'form': Register,
            'request': request,
        })
        pass
    if request.method == 'POST':
        username = request.POST['phone']
        email = request.POST['email']
        password = request.POST['password']
        if password == request.POST['passwordcheck']:
            User.objects.create_user(username, email, password)
            return HttpResponse(username + '/' + email + '/' + password)
        else:
            return HttpResponse('please retype your password')


username = ""
def webauthn_begin_activate(request):
    # username = request.POST.get('username')
    global username
    username = request.POST.get('register_username', '')
    display_name = request.POST.get('register_display_username')
    print(username)
    rp_name = "localhost"
    challenge = generate_challenge(32)
    ukey = generate_ukey()
    if 'register_ukey' in request.session:
        del request.session['register_ukey']
    if 'register_username' in request.session:
        del request.session['register_username']
    if 'register_display_name' in request.session:
        del request.session['register_display_name']
    if 'challenge' in request.session:
        del request.session['challenge']
    request.session['register_username'] = username
    request.session['register_display_name'] = display_name
    request.session['challenge'] = challenge
    request.session['register_ukey'] = ukey

    make_credential_options = webauthn.WebAuthnMakeCredentialOptions(
        challenge, rp_name, RP_ID, ukey, username, display_name,
        'https://chendin.com')
    temp = make_credential_options.registration_dict
    temp['attestation']='indirect'
    return JsonResponse(temp)


def webauthn_begin_assertion(request):

    username = request.POST.get('login_username')
    challenge = generate_challenge(32)
    user = User_T.objects.get(username=username)
    if 'challenge' in request.session:
        del request.session['challenge']

    challenge = generate_challenge(32)

    request.session['challenge'] = challenge
    webauthn_user = webauthn.WebAuthnUser(
        user.ukey, user.username, user.display_name, user.icon_url,
        user.credential_id, user.pub_key, user.sign_count, user.rp_id)

    webauthn_assertion_options = webauthn.WebAuthnAssertionOptions(
        webauthn_user, challenge)
    return JsonResponse(webauthn_assertion_options.assertion_dict)

def verify_credential_info(request):
    # user = authenticate(request, username=username)
    global username
    user = User.objects.get(username=username)

    login(request, user)
    return HttpResponseRedirect(reverse_lazy('profile'))

    challenge = request.session['challenge']
    username = request.session['register_username']
    display_name = request.session['register_display_name']
    ukey = request.session['register_ukey']


    registration_response = request.POST
    trust_anchor_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), TRUST_ANCHOR_DIR)
    trusted_attestation_cert_required = True
    self_attestation_permitted = True
    none_attestation_permitted = True
    webauthn_registration_response = webauthn.WebAuthnRegistrationResponse(
        RP_ID,
        ORIGIN,
        registration_response,
        challenge,
        trust_anchor_dir,
        trusted_attestation_cert_required,
        self_attestation_permitted,
        none_attestation_permitted,
        uv_required=False)
    try:
        webauthn_credential = webauthn_registration_response.verify()
    except Exception as e:
        return JsonResponse({'fail': 'Registration failed. Error: {}'.format(e)})

    credential_id_exists = User_T.get(
        credential_id=webauthn_credential.credential_id)
    if credential_id_exists:
        return JsonResponse({ 'fail': 'Credential ID already exists.'})

    existing_user = User_T.get(username=username)
    if not existing_user:
        if sys.version_info >= (3, 0):
            webauthn_credential.credential_id = str(
                webauthn_credential.credential_id, "utf-8")
        user = User_T.objects.create(
            ukey=ukey,
            username=username,
            display_name=display_name,
            pub_key=webauthn_credential.public_key,
            credential_id=webauthn_credential.credential_id,
            sign_count=webauthn_credential.sign_count,
            rp_id=RP_ID,
            icon_url='https://example.com')
    else:
        return JsonResponse({'fail': 'User already exists.'})
    print('Successfully registered as {}.'.format(username))
    return JsonResponse({'success': 'User successfully registered.'})

def verify_assertion(request):
    challenge = request.session.get('challenge',False)
    assertion_response = request.POST
    credential_id = assertion_response.get('id')

    user = User_T.get(credential_id=credential_id)
    if not user:
        return JsonResponse({'fail': 'User does not exist.'})

    webauthn_user = webauthn.WebAuthnUser(
        user.ukey, user.username, user.display_name, user.icon_url,
        user.credential_id, user.pub_key, user.sign_count, user.rp_id)

    webauthn_assertion_response = webauthn.WebAuthnAssertionResponse(
        webauthn_user,
        assertion_response,
        challenge,
        ORIGIN,
        uv_required=False)  # User Verification

    try:
        sign_count = webauthn_assertion_response.verify()
    except Exception as e:
        return JsonResponse({'fail': 'Assertion failed. Error: {}'.format(e)})

    # Update counter.
    user.sign_count = sign_count
    user.save()

    login(request,user)

    return JsonResponse({
        'success':
        'Successfully authenticated as {}'.format(user.username)
    })


def generate_challenge(challenge_len):
    return ''.join([
        random.SystemRandom().choice(string.ascii_letters + string.digits)
        for i in range(challenge_len)
    ])
def generate_ukey():
    return generate_challenge(20)
