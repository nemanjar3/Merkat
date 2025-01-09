from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from ..serializers.shared_serializers import ListingSerializer
from merkatapp.models import Listing

class GetListingByIdAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Samo za tebe Stefaneee",
        responses={
            200: ListingSerializer,
            404: "Listing not found"
        }
    )
    def get(self, request, listing_id, *args, **kwargs):
        try: 
            listing = Listing.objects.get(pk=listing_id)
            serializer = ListingSerializer(listing)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Listing.DoesNotExist:
            return Response(
                {"detail": f"Listing with ID {listing_id} does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
