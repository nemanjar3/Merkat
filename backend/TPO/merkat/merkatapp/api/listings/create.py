from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..serializers.listing_serializers import ListingCreateSerializer


class ListingCreateAPI(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=ListingCreateSerializer,
        responses={
            201: "Listing created successfully.",
            400: "Bad Request",
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = ListingCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Listing created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
