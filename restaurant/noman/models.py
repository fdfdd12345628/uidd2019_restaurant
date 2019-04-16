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

class order(models.Model):
    id = models.IntegerField(primary_key=True)
    meals = JSONField()
    #會放入json的json的json 詳細看model圖
    progress = models.IntegerField(blank=True)
    other = models.CharField(max_length=1000,blank=True)

    def __str__(self):
        return self.id

