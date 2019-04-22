from django.urls import path, include
from .views import login_user, logout_user, profile
from django.contrib.auth import urls

urlpatterns = [
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile, name='profile'),
    path('', include(urls))
]
