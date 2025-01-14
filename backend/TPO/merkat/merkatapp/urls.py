from django.urls import path
from . import views


urlpatterns = [
    # This is 1st check for DataBase and DJANGO-ADMIN and ADD LISTING
    path('create-profile/', views.create_profile, name='create_profile'),
    path('success/', views.success, name='success'),

    path('', views.success, name='home'),  # Add this line for the root URL

]