from django.urls import path
from .create import UserCreateAPI
from .login import LoginAPI
from .profile import ProfileAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('create/', UserCreateAPI.as_view(), name='user-create'),
    path('login/', LoginAPI.as_view(), name='user-login'),
    path('api/users/<int:user_id>/profile/', ProfileAPI.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]