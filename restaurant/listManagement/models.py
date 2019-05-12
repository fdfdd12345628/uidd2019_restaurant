from django.db import models
from django.conf import settings
# Create your models here.

#class OrderList(models.Model):
#    user_name = models.CharField(max_length=20)
#    progress = models.DecimalField(max_digits=3, decimal_places=0)
#    total_price = models.DecimalField(max_digits=4, decimal_places=0)
#
#    def __listProgress__(self):
#        return self.progress
#
#    def __listTotalPrice__(self):
#        return self.total_price

#class OrderElements(models.Model):
#    order_name = models.CharField(max_length=20)
#    order_amount = models.DecimalField(max_digits=3, decimal_places=0)
#    order_price = models.DecimalField(max_digits=3, decimal_places=0)
#    order_total_price = models.DecimalField(max_digits=3, decimal_places=0)
#    order_list = models.ForeignKey(OrderList, on_delete=models.CASCADE)
#
#    def __orderName__(self):
#        return self.order_name
#
#    def __orderAmount__(self):
#        return self.order_amount
#
#    def __orderPrice__(self):
#        return self.order_price
#
#    def __orderTotalPrice__(self):
#        return self.order_total_price
