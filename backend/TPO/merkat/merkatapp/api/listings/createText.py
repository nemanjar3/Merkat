from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.listing_serializers import ListingTextCreateSerializer


class ListingTextCreateAPIView(APIView):
    @swagger_auto_schema(
        request_body=ListingTextCreateSerializer,
        operation_summary="Create a listing with textual data",
        operation_description="Adds textual data for a listing (e.g., title, description, category)."
    )
    def post(self, request, *args, **kwargs):
        serializer = ListingTextCreateSerializer(data=request.data)
        if serializer.is_valid():
            listing = serializer.save()
            return Response({'listing_id': listing.listing_id, 'message': 'Listing created successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
