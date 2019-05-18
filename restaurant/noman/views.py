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
    if request.method =="GET":
        content = {}
        temp_data = []
        owner = user.objects.get(id="2")
        all_order = order.objects.filter(owner=owner)
        for ele in all_order:
            temp_data.append(ele)
            print(ele.total_money)
        content["order_data"]=temp_data
        return render(request,'cart.html',content)
    if request.method == "POST":
        dic = json.loads(request.POST.get('meal',''))
        print(dic)
        meal = ""
        for key, value in dic.items():
            print("{} {}".format(key, value))
            meal = set_order(key, value, meal)
        owner = User.objects.get(id="2")
        max_id = order.objects.all().order_by("-id")[0].id
        print(request.POST.get("money",""))
        p = order.objects.create(id=max_id + 1, owner=owner, progress=1, meals=meal,total_money=request.POST.get("money",""),create_time="2019.05.12_10.14")
        p.save()
        return JsonResponse({"order_num": max_id + 1})


meal_img={
    "cart_duck_01_honey":"duck_01.png",
    "cart_duck_01_tomato":"duck_01.png",
    "cart_duck_01_lemon":"duck_01.png",
    "cart_salmon_01_honey":"salmon_01.png",
    "cart_salmon_01_tomato":"salmon_01.png",
    "cart_salmon_01_lemon":"salmon_01.png",
    "cart_beef_01_honey":"beef_01.png",
    "cart_beef_01_tomato":"beef_01.png",
    "cart_beef_01_lemon":"beef_01.png",
    "cart_hotdog_01_honey":"hot_dog_01.png",
    "cart_hotdog_01_tomato":"hot_dog_01.png",
    "cart_hotdog_01_lemon":"hot_dog_01.png",
    "cart_blackTea_01":"black_tea_01.png",
    "cart_greenTea_01":"green_tea_01.png",
    "cart_fish_01":"fish_01.png",
    "cart_fries_01":"fries_01.png",
}
def list_management(request,id_num):
    user_order = order.objects.get(id = id_num)
    content = {}
    content["money"] = user_order.total_money
    content["progress"] = user_order.progress
    meals_list = user_order.meals.split(",")
    temp_list = []
    exist_list =[]
    for ele in meals_list:
        temp_spmeal = special_meal.objects.get(id = ele)
        if meal_img[Meal.objects.get(special_meal__id =ele).name] not in exist_list:
            temp_list.append({
                "image": meal_img[Meal.objects.get(special_meal__id =ele).name] ,
                "number":temp_spmeal.number,
                "money":temp_spmeal.number*Meal.objects.get(special_meal__id = ele).money},
            )
            exist_list.append(meal_img[Meal.objects.get(special_meal__id =ele).name])
        else:
            for m in temp_list:
                if m["image"] == meal_img[Meal.objects.get(special_meal__id =ele).name]:
                    m["number"]+=temp_spmeal.number
                    break
    content["detail"] = temp_list
    print(content)
    return render(request, "listManagement.html",content)

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
