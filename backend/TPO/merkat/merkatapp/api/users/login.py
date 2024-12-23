from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from ..serializers.user_serializers import LoginSerializer
from merkatapp.models import User
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class LoginAPI(APIView):
    @swagger_auto_schema(
        request_body=LoginSerializer,
        responses={
            200: openapi.Response("Login successful"),
            401: openapi.Response("Invalid password"),
            404: openapi.Response("User not found"),
            400: openapi.Response("Validation errors"),
        }
    )

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(username=username)
                if check_password(password, user.password):  
                    return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)