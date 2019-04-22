from django import forms
from .models import User
from django.contrib.auth import forms as auth_forms
from django.contrib.auth import views, urls

class UserLoginForm(auth_forms.AuthenticationForm):
    class Meta:
        model=User
        fields=('username', 'password')
    pass


'''class UserForm(forms.ModelForm):
    username=forms.CharField(max_length=150)
    password=forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ('username', 'password')
'''
class SetPassword(forms.BaseForm):
    pass
