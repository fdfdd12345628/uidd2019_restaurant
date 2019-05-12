from django.shortcuts import render

# Create your views here.
def list_management(request):
    return render(request, "listManagement.html")
