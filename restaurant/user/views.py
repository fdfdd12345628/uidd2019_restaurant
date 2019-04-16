from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http.response import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required


def login_user(request):
    if (request.method == 'GET'):
        pass
    elif (request.method == 'POST'):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(request.user)
        # return HttpResponseRedirect(reverse('home'))
        else:
            return HttpResponse('invalid user')


def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse_lazy('home'))


@login_required(redirect_field_name=reverse_lazy('login'))
def profile(request):
    user = request.user
    return HttpResponse('Hello, ' + user.username + '<br>')
