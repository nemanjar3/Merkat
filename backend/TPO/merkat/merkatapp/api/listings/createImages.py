from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.listing_serializers import ListingImageCreateSerializer


class ListingImageCreateAPIView(APIView):
    # This will expect form-data (it should work like that)
    def post(self, request, *args, **kwargs):
        serializer = ListingImageCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Images added successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
