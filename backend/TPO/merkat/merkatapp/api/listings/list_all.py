from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers.shared_serializers import ListingSerializer
from merkatapp.models import Listing

class ListingListAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        responses={200: ListingSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        listings = Listing.objects.all().order_by('-posted_date') # sortiranje po datumu
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)
