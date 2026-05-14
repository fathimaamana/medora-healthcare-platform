from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):

    return HttpResponse(
        "Medora API Running Successfully"
    )

urlpatterns = [

    path('', home, name='home'),

    path('admin/', admin.site.urls),

    path(
        'api/auth/',
        include('apps.accounts.api.urls')
    ),

    path(
        'api/inventory/',
        include('apps.inventory.api.urls')
    ),
]