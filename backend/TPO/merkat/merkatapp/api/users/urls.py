from django.urls import path
from .create import UserCreateAPI
from .login import LoginAPI
from .profile import ProfileAPI
from .update import UserUpdateAPI

urlpatterns = [
    path('create/', UserCreateAPI.as_view(), name='user-create'),
    path('login/', LoginAPI.as_view(), name='user-login'),
    path('api/users/<int:user_id>/profile/', ProfileAPI.as_view(), name='profile'),
    path('profile/update/<int:user_id>/', UserUpdateAPI.as_view(), name='profile-update'),
]
