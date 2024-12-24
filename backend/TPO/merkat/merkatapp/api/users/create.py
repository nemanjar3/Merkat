from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers.user_serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserCreateAPI(APIView):
    @swagger_auto_schema(
        request_body=UserSerializer, 
        responses={201: UserSerializer, 400: 'Bad Request'}
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': 'Username already exists'}, status=400)

