from django.db import models
from django.conf import settings
# Create your models here.


class Meal(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    detail = models.CharField(max_length=1000,blank=True)
    photo = models.FileField(blank=True)
    money = models.IntegerField(blank=True)
    category = models.IntegerField(blank= True)

    count = models.IntegerField(blank = True)
    def __str__(self):
        return self.name


class special_meal(models.Model):
    id = models.IntegerField(primary_key=True)
    meal_id = models.ForeignKey(Meal, on_delete=models.CASCADE)
    number = models.IntegerField(blank = True)
    comment = models.CharField(max_length=500,blank=True)


class order(models.Model):
    id = models.IntegerField(primary_key=True)
    meals = models.CharField(max_length=500,blank=True)
    #store the string of multiple [special meal id]
    progress = models.IntegerField(blank=True)
    other = models.CharField(max_length=1000,blank=True)
    QR_code = models.CharField(max_length = 100 , blank = True)
    create_time = models.CharField(max_length=100,blank=True)
    total_money = models.IntegerField(blank = True)
    favor = models.IntegerField(blank=True)
    # favor- 0: false 1: true
    # record QR_code represent's string and change it to real QR code
    # immediately
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.id)

