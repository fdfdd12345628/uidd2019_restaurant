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


meal_img = {
    "cart_duck_01_honey": "duck_01.png",
    "cart_duck_01_tomato": "duck_01.png",
    "cart_duck_01_lemon": "duck_01.png",
    "cart_salmon_01_honey": "salmon_01.png",
    "cart_salmon_01_tomato": "salmon_01.png",
    "cart_salmon_01_lemon": "salmon_01.png",
    "cart_beef_01_honey": "beef_01.png",
    "cart_beef_01_tomato": "beef_01.png",
    "cart_beef_01_lemon": "beef_01.png",
    "cart_hotdog_01_honey": "hot_dog_01.png",
    "cart_hotdog_01_tomato": "hot_dog_01.png",
    "cart_hotdog_01_lemon": "hot_dog_01.png",
    "cart_blackTea_01": "black_tea_01.png",
    "cart_greenTea_01": "green_tea_01.png",
    "cart_fish_01": "fish_01.png",
    "cart_fries_01": "fries_01.png",
}

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
        content = {}
        temp_data = []
        owner = User.objects.get(id="2")
        all_order = order.objects.filter(owner=owner, progress__lte=2)
        for ele in all_order:
            temp_data.append(ele)
        content["order_data"] = temp_data
        #favor data
        order_data_list=[]
        for each_order in order.objects.filter(owner = owner , favor =1):
            #get every favor order
            temp_content = {}
            # each order data in dict
            temp_content["money"] = each_order.total_money
            temp_content["progress"] = each_order.progress
            # 其實可以不用
            temp_content["burger"] =0
            temp_content["drink"] =0
            temp_content["snack"] =0
            meals_list = each_order.meals.split(",")
            temp_list = []
            exist_list = []
            for ele in meals_list:
                temp_spmeal = special_meal.objects.get(id=ele)
                temp_meal = Meal.objects.get(special_meal__id=ele)
                # below is counting category
                if temp_meal.category == 1:
                    temp_content["burger"]+=1
                elif temp_content.category ==2:
                    temp_content["drink"]+=1
                else:
                    temp_content["snack"]+=2
                if meal_img[temp_meal.name] not in exist_list:
                    temp_list.append({
                        "image": meal_img[temp_meal.name],
                        "name": temp_meal.name,
                        "number": temp_spmeal.number,
                        "money": temp_spmeal.number *temp_meal.money},
                    )
                    exist_list.append(meal_img[temp_meal.name])
                else:
                    for m in temp_list:
                        if m["image"] == meal_img[temp_meal.name]:
                            m["number"] += temp_spmeal.number
                            break
            temp_content["detail"] = temp_list
            order_data_list.append(temp_content)
        content['favor_order'] = order_data_list
        print(order_data_list)
        return render(request, 'cart.html', content)
    if request.method == "POST":
        dic = json.loads(request.POST.get('meal', ''))
        print(dic)
        meal = ""
        bulk = []
        max_meal_id = special_meal.objects.all().order_by("-id")[0].id
        print(max_meal_id)
        for i, (key, value) in enumerate(dic.items()):
            print("{} {}".format(key, value))
            # meal = set_order(key, value, meal)
            if (meal != ""):
                meal = meal + "," + str(max_meal_id + 1)
            else:
                meal = str(max_meal_id + 1)
            select_meal = Meal.objects.get(name=key)
            bulk.append(special_meal(id=max_meal_id + i + 1, meal_id=select_meal, number=value))
        special_meal.objects.bulk_create(bulk)
        owner = User.objects.get(id="2")
        max_id = order.objects.all().order_by("-id")[0].id
        print(request.POST.get("money", ""))
        p = order.objects.create(id=max_id + 1, owner=owner, progress=1, meals=meal,
                                 total_money=request.POST.get("money", ""), create_time="2019.05.12_10.14", favor=0)
        p.save()
        return JsonResponse({"order_num": max_id + 1})



def list_management(request, id_num):
    user_order = order.objects.get(id=id_num)
    content = {}
    content["money"] = user_order.total_money
    content["progress"] = user_order.progress
    meals_list = user_order.meals.split(",")
    temp_list = []
    exist_list = []
    for ele in meals_list:
        temp_spmeal = special_meal.objects.get(id=ele)
        temp_meal = Meal.objects.get(special_meal__id=ele)
        if meal_img[temp_meal.name] not in exist_list:
            temp_list.append({
                "image": meal_img[temp_meal.name],
                "number": temp_spmeal.number,
                "money": temp_spmeal.number * temp_meal.money},
            )
            exist_list.append(meal_img[temp_meal.name])
        else:
            for m in temp_list:
                if m["image"] == meal_img[temp_meal.name]:
                    m["number"] += temp_spmeal.number
                    break
    content["detail"] = temp_list
    print(content)
    return render(request, "listManagement.html", content)


def payment(request, id_num=0):
    if request.method=="GET":
        try:
            current_order = order.objects.get(pk=id_num)
        except:
            return HttpResponseRedirect(reverse_lazy('cart'))
        if current_order.progress >= 2:
            return HttpResponseRedirect(reverse_lazy('list_management', kwargs={'id_num': id_num}))
        context = {
            'paypal_id': PAYPAL_CLIENT_ID,
            'id': id_num,
            'money': current_order.total_money
        }
        user_order = order.objects.get(id=id_num)
        context["money"] = user_order.total_money
        context["progress"] = user_order.progress
        meals_list = user_order.meals.split(",")
        temp_list = []
        exist_list = []
        for ele in meals_list:
            temp_spmeal = special_meal.objects.get(id=ele)
            temp_meal = Meal.objects.get(special_meal__id=ele)
            if meal_img[temp_meal.name] not in exist_list:
                temp_list.append({
                    "image": meal_img[temp_meal.name],
                    "number": temp_spmeal.number,
                    "money": temp_spmeal.number * temp_meal.money},
                )
                exist_list.append(meal_img[temp_meal.name])
            else:
                for m in temp_list:
                    if m["image"] == meal_img[temp_meal.name]:
                        m["number"] += temp_spmeal.number
                        break
        context["detail"] = temp_list
        print(temp_list)
        return render(request, 'pay.html', context)


def payment_complete(request, id_num=0):
    if request.method == 'POST':
        try:
            current_order = order.objects.get(pk=id_num)
        except:
            return HttpResponseRedirect(reverse_lazy('cart'))
        if current_order.progress >= 2:
            return HttpResponse('already paid', status=200)
        basic_auth = base64.b64encode(bytes(PAYPAL_CLIENT_ID + ':' + PAYPAL_SECRET, 'utf-8'))
        print(str(basic_auth)[2:-1])
        auth = requests.post(PAYPAL_OAUTH_API, headers={
            'Accept': 'application/json',
            'Authorization': 'Basic ' + str(basic_auth)[2:-1],
        }, data={
            'grant_type': 'client_credentials'
        })
        print(auth.text)
        print(auth.status_code)
        if auth.status_code != 200:
            return HttpResponse('internal server error', status=500)
        print(auth.json()['access_token'])
        print(request.body)
        body = json.loads(request.body)
        print(body)
        details = requests.get(PAYPAL_ORDER_API + body['orderID'], headers={
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + auth.json()['access_token'],
        })
        if details.status_code != 200:
            return HttpResponse(status=500)

        print(json.dumps(details.json(), indent=2))
        if float(details.json()['purchase_units'][0]['amount']['value']) != float(current_order.total_money):
            return HttpResponse('error transaction record', status=400)
        current_order.progress = 2
        current_order.save()
        return HttpResponse(status=200)
        pass
    elif request.method == 'GET':
        try:
            current_order = order.objects.get(pk=id_num)
        except:
            return HttpResponseRedirect(reverse_lazy('cart'))
        if current_order.progress >= 2:
            return HttpResponseRedirect(reverse_lazy('list_management', kwargs={'id_num': id_num}))
        return HttpResponseRedirect(reverse_lazy('payment', kwargs={'id_num': id_num}))


def pay(request,id_num):
    content = {}
    return render(request,"pay.html",content)
