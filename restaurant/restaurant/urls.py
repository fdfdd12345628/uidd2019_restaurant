"""restaurant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from noman.views import index, cart, payment, payment_complete, list_management,pay
from user.views import webauthn_begin_activate,webauthn_begin_assertion,verify_credential_info
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('index/', index, name='home'),
                  path('accounts/', include('user.urls')),
                  path('cart/payment/<int:id_num>', payment, name='payment'),
                  path('cart/payment/payment_complete/<int:id_num>', payment_complete, name='pay_complete'),
                  path('cart/', cart, name='cart'),
                  path('list_management/<int:id_num>', list_management, name='list_management'),
                  path("webauthn_begin_activate", webauthn_begin_activate),
                  path("webauthn_begin_assertion", webauthn_begin_assertion),
                  path("verify_credential_info", verify_credential_info),
                  path('', index),


              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL)
