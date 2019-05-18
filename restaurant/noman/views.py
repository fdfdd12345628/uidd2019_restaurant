from django.shortcuts import render
from .models import Meal, order
from django.http import JsonResponse
from .models import Meal, order, special_meal
from user.models import User
from django.http.response import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
import json, base64
import requests
from django.apps import apps
from restaurant.settings import PAYPAL_CLIENT_ID, PAYPAL_OAUTH_API, PAYPAL_ORDER_API, PAYPAL_SECRET


# Create your views here.
def index(request):
    return render(request, "index.html")


def set_order(order_name, nums, meal):
    max_meal_id = special_meal.objects.all().order_by("-id")[0].id
    if (meal != ""):
        meal = meal + "," + str(max_meal_id + 1)
    else:
        meal = str(max_meal_id + 1)
    select_meal = Meal.objects.get(name=order_name)
    p = special_meal.objects.create(id=max_meal_id + 1, meal_id=select_meal, number=nums)
    p.save()
    select_meal.count += 1
    select_meal.save()
    return meal


def cart(request):
    if request.method == "GET":
        return render(request, 'cart.html')
    if request.method == "POST":
        dic = json.loads(request.POST.get('meal', 'uuuu'))
        print(dic)
        meal = ""
        for key, value in dic.items():
            print("{} {}".format(key, value))
            meal = set_order(key, value, meal)
        owner = User.objects.get(id="2")
        max_id = order.objects.all().order_by("-id")[0].id
        p = order.objects.create(id=max_id + 1, owner=owner, progress=1, meals=meal)
        p.save()
        return JsonResponse({"order_num": max_id + 1})


def payment(request):
    context = {
        'paypal_id': PAYPAL_CLIENT_ID,
    }

    return render(request, 'payment/payment.html', context)
    pass


def payment_complete(request, id):
    if request.method == 'POST':
        basic_auth = base64.b64encode(bytes(PAYPAL_CLIENT_ID + ':' + PAYPAL_SECRET, 'utf-8'))
        print(str(basic_auth)[2:-1])
        auth = requests.post(PAYPAL_OAUTH_API, headers={
            'Accept': 'application/json',
            'Authorization': 'Basic ' + str(basic_auth)[2:-1],
        }, data={
            'grant_type': 'client_credentials'
        })
        # print(auth.text)
        # print(auth.status_code)
        if auth.status_code != 200:
            return HttpResponse('internal server error', status=500)
        # print(auth.json()['access_token'])
        # print(request.body)
        body = json.loads(request.body)
        print(body)
        details = requests.get(PAYPAL_ORDER_API + body['orderID'], headers={
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + auth.json()['access_token'],
        })
        print(json.dumps(details.json(), indent=2))
        if details.json()['purchase_units'][0]['amount']['value'] != str(0.01):
            return HttpResponse(status=400)

        return HttpResponse(status=500)
        pass
    elif request.method == 'GET':
        return HttpResponse('nothing here')
