from django.urls import path, include
from .views import login_user, logout_user, profile, register,favor
from django.contrib.auth import urls

urlpatterns = [
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile, name='profile'),
    path("register/", register, name='register'),
    path('', include(urls)),
    path('', login_user),
    path('profile/favor',favor, name='favor')

]
