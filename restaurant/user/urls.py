from django.urls import path
from .views import login_user, logout_user, profile
from django.contrib import admin

urlpatterns = [
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile, name='profile'),
]
