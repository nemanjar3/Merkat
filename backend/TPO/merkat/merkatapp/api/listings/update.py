from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..serializers.listing_serializers import ListingCreateSerializer
from merkatapp.models import Listing

class ListingUpdateAPI(APIView):
    # U produkciji bi ovo trebalo staviti! Za sad zbog testiranja neka bude komentirano
    # permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=ListingCreateSerializer,
        responses={
            200: "Listing updated successfully.",
            400: "Bad Request",
            404: "Listing not found.",
        }
    )
    def put(self, request, listing_id, *args, **kwargs):
        try:
            listing = Listing.objects.get(pk=listing_id)
        except Listing.DoesNotExist:
            return Response({"error": "Listing not found."}, status=404)

        # ovo u produkciji treba odkomentarisati da bi samo user ciji je oglas mogao da ga UPDATE
        # if listing.user != request.user:
        #     return Response({"error": "You do not have permission to update this listing."}, status=403)

        serializer = ListingCreateSerializer(listing, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Listing updated successfully."})
        return Response(serializer.errors, status=400)
