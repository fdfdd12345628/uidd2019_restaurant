from django import forms
from .models import User


class UserForm(forms.ModelForm):
    username=forms.CharField(max_length=150)
    password=forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ('username', 'password')
