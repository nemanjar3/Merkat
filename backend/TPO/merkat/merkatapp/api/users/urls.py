from django.urls import path
from .create import UserCreateAPI
from .login import LoginAPI
from .profile import ProfileAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .update import UserUpdateAPI
urlpatterns = [
    path('create/', UserCreateAPI.as_view(), name='user-create'),
    path('login/', LoginAPI.as_view(), name='user-login'),
    path('profile/<int:user_id>/', ProfileAPI.as_view(), name='profile'),    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/update/<int:user_id>/', UserUpdateAPI.as_view(), name='profile-update'),

]