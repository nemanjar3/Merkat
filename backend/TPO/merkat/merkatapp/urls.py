from django.urls import path
from . import views


urlpatterns = [
    path('', views.success, name='home'),  # Add this line for the root URL
]