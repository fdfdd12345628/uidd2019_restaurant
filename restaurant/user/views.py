from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http.response import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from .forms import UserLoginForm, Register
from noman.models import Meal, order, special_meal
from restaurant import settings


def login_user(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse_lazy('profile'))
        return render(request, 'accounts/login.html', {'form': UserLoginForm})
        pass
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
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


@login_required(redirect_field_name=reverse_lazy('login'))
def profile(request):
    if request.user.is_authenticated:
        userid = request.user.id
    owner = request.user
    all_order = order.objects.filter(owner=owner)
    content = []
    finish_item = []
    buger = 0
    snack = 0
    drink = 0
    i=1
    for ele in all_order:
        temp_data = {}
        temp_data["money"] = ele.total_money
        temp_data["progress"] = ele.progress
        temp_data["favor_id"] = ele.id
        meals_list = ele.meals.split(",")
        for o in meals_list:
            temp_spmeal = special_meal.objects.get(id=o)
            temp_meal = Meal.objects.get(id=temp_spmeal.meal_id_id)
            if temp_meal.category == 1:
                buger += 1
            elif temp_meal.category == 2:
                drink += 1
            elif temp_meal.category == 3:
                snack += 1
        temp_data["burger"] = buger
        temp_data["drink"] = drink
        temp_data["snack"] = snack
        buger=0
        drink=0
        snack=0
        if ele.progress==3:
            finish_item.append(temp_data)
        else :
            content.append(temp_data)
    return render(request, 'accounts/profile.html', {
        'request': request,
        'content': content,
        'finisg_item':finish_item
    })
    # return render(request,'accounts/profile.html',{
    # 'request': request,
    # },content,finish_item)

def register(request):
    if request.method == 'GET':
        return render(request, 'accounts/register.html', {
            'form': Register,
            'request': request,
        })
        pass
    if request.method == 'POST':
        f = Register(request.POST)

        if f.is_valid():
            f.save()
            return HttpResponseRedirect(reverse_lazy('login'))
        else:
            return HttpResponseRedirect(reverse_lazy('register'))
        pass

def favor  (request):
    if request.method == 'GET':
        id_num = request.GET['id_num']
        select_order = order.objects.get(id=id_num)
        select_order.favor = 1
        select_order.save()
    return HttpResponse()