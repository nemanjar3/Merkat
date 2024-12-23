from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.user_serializers import ProfileSerializer
from merkatapp.models import User
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class ProfileAPI(APIView):
    @swagger_auto_schema(
        responses={
            200: ProfileSerializer(),
            404: "User not found",
        }
    )

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')  
        try:
            user = User.objects.get(user_id=user_id)
            serializer = ProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
