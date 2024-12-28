from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers.user_serializers import UserUpdateSerializer
from merkatapp.models import User
from drf_yasg.utils import swagger_auto_schema

class UserUpdateAPI(APIView):
    # ako smeta zakomentarisi, ako provjeravas u swagger moras zakomentarisati
    # permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=UserUpdateSerializer,
        responses={
            200: "Profile updated successfully.",
            400: "Bad Request",
            404: "User not found",
        }
    )
    def put(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserUpdateSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
