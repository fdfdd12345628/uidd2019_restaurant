from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.


class Meal(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    detail = models.CharField(max_length=1000,blank=True)
    photo = models.FileField(blank=True)
    money = models.IntegerField(blank=True)

    count = models.IntegerField(blank = True)
    def __str__(self):
        return self.name


class special_meal(models.Model):
    id = models.IntegerField(primary_key=True)
    meal_id = models.ForeignKey(Meal, on_delete=models.CASCADE)
    count = models.IntegerField(blank = True)
    comment = models.CharField(max_length=500,blank=True)


class order(models.Model):
    id = models.IntegerField(primary_key=True)
    meals = models.CharField(max_length=500,blank=True)
    progress = models.IntegerField(blank=True)
    other = models.CharField(max_length=1000,blank=True)

    def __str__(self):
        return self.id

