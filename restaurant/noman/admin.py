from django.contrib import admin
from .models import *


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    pass


@admin.register(special_meal)
class SpecialMealAdmin(admin.ModelAdmin):
    pass


@admin.register(order)
class OrderAdmin(admin.ModelAdmin):

    pass
# Register your models here.
