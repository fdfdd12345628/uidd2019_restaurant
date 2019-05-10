from django.shortcuts import render
from .models import Meal, order
from django.http import JsonResponse
from .models import Meal, order,special_meal
import json
from django.apps import apps
user = apps.get_model('user', 'user')
# Create your views here.
def index(request):

    return render(request,"index.html")


def set_order(order_name, nums,meal):
    max_meal_id = special_meal.objects.all().order_by("-id")[0].id
    if (meal != ""):
        meal = meal + "," + str(max_meal_id + 1)
    else:
        meal = str(max_meal_id + 1)
    select_meal = Meal.objects.get(name=order_name)
    p = special_meal.objects.create(id = max_meal_id+1,meal_id =select_meal,number = nums)
    p.save()
    select_meal.count+=1
    select_meal.save()
    return meal

def cart(request):
    if request.method =="GET":
        return render(request,'cart.html')
    if request.method == "POST":
        dic = json.loads(request.POST.get('meal','uuuu'))
        print(dic)
        meal=""
        for key,value in dic.items():
            print("{} {}".format(key,value))
            meal=set_order(key,value,meal)
        owner = user.objects.get(id="2")
        max_id = order.objects.all().order_by("-id")[0].id
        p = order.objects.create(id=max_id + 1, owner=owner, progress=1, meals=meal)
        p.save()
        return JsonResponse({"order_num":max_id + 1})