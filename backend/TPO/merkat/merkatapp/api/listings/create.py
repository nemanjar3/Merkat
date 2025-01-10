from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers.listing_serializers import ListingCreateSerializer
from merkatapp.models import User

class ListingCreateAPI(APIView):
    permission_classes = [AllowAny]  # maybe late isAuthenticated

    @swagger_auto_schema(
        request_body=ListingCreateSerializer,
        responses={
            201: "Listing created successfully.",
            400: "Bad Request",
        },
        request_content_type="multipart/form-data",
        exclude_fields=['images']
    )
    def post(self, request, *args, **kwargs):
        serializer = ListingCreateSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.pop('user_id', None)
            try:
                user = User.objects.get(user_id=user_id)
            except User.DoesNotExist:
                return Response({"error": f"User with ID {user_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=user)
            return Response({"message": "Listing created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
