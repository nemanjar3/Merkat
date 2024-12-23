from django.urls import path
from . import views


urlpatterns = [
    # This is 1st check for DataBase and DJANGO-ADMIN and ADD LISTING
    path('create-profile/', views.create_profile, name='create_profile'),
    path('success/', views.success, name='success'),

    # This is 2nd check for LOGIN and SIGNIN and ADD LISTING
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/', views.profile, name='profile'),
]