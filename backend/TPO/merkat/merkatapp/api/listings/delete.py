from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ...models import Listing, Image, ListingAttributeValue
from ..serializers.listing_serializers import ListingDeleteSerializer

class ListingDeleteAPI(APIView):
    # permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=ListingDeleteSerializer,
        responses={
            200: "Listing deleted successfully.",
            400: "Bad Request",
            404: "Not Found"
        }
    )
    def delete(self, request, *args, **kwargs):
        serializer = ListingDeleteSerializer(data=request.data)
        if serializer.is_valid():
            listing_id = serializer.validated_data['listing_id']
            try:
                listing = Listing.objects.get(pk=listing_id)
            except Listing.DoesNotExist:
                return Response({"message": "Listing not found."}, status=status.HTTP_404_NOT_FOUND)
            
            # deleting all objects that point to listing we are deleting!
            listing.images.all().delete()

            listing.attribute_values.all().delete()

            listing.delete()
            
            return Response({"message": "Listing deleted successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)