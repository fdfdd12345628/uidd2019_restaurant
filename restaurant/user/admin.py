from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)

# Register your models here.
