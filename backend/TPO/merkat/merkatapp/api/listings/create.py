from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers.listing_serializers import ListingCreateSerializer
from merkatapp.models import User
from rest_framework.parsers import MultiPartParser, JSONParser
from django.http import QueryDict
import json

class ListingCreateAPI(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, JSONParser]  # Allow JSON and multipart/form-data

    @swagger_auto_schema(
        request_body=ListingCreateSerializer,
        responses={
            201: "Listing created successfully.",
            400: "Bad Request",
        },
    )
    def post(self, request, *args, **kwargs):
        print("-------------------------------------------\n")
        print("Request data:", request.data)
        print("-------------------------------------------\n")

        # Create a mutable copy of request.data
        data_copy = request.data.dict() if isinstance(request.data, QueryDict) else request.data

        print("-------------------------------------------\n")
        print("Request data copy:", data_copy)
        print("-------------------------------------------\n")

        # Extract and parse the JSON payload from the 'data' field
        if 'data' in data_copy:
            try:
                parsed_data = json.loads(data_copy['data'])
                data_copy = parsed_data  # Merge parsed JSON data into data_copy
                print("Parsed and merged data:", data_copy)
            except json.JSONDecodeError as e:
                return Response({"error": f"Invalid JSON in 'data': {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        print("-------------------------------------------\n")
        print("Request data after parsing:", data_copy)
        print("-------------------------------------------\n")


        # Reconstruct the request data as a QueryDict
        mutable_data = QueryDict('', mutable=True)
        mutable_data.update(data_copy)

        print("-------------------------------------------\n")
        print("Request data images:", request.FILES.getlist('images'))
        print("-------------------------------------------\n")

        mutable_data.setlist('images', request.FILES.getlist('images'))  # Add images as a list

        print("-------------------------------------------\n")
        print("Mutable data:", mutable_data)
        print("-------------------------------------------\n")

        serializer = ListingCreateSerializer(data=mutable_data)

        print("-------------------------------------------\n")
        print("Serializer data:", serializer)
        print("-------------------------------------------\n")


        if serializer.is_valid():
            user_id = serializer.validated_data.pop('user_id', None)
            try:
                user = User.objects.get(user_id=user_id)
            except User.DoesNotExist:
                return Response({"error": f"User with ID {user_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(user=user)
            return Response({"message": "Listing created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
