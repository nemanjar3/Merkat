from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from merkatapp.models import CategoryAttributes, Category
from ..serializers.category_attr_serializers import CategoryAttributeSerializer

class CategoryAttributeListAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List attributes for a given category by name",
        manual_parameters=[
            openapi.Parameter(
                "category_name",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Name of the category",
                required=True,
            )
        ],
        responses={200: CategoryAttributeSerializer(many=True)},
    )
    def get(self, request):
        category_name = request.query_params.get("category_name")
        if not category_name:
            return Response({"error": "Category name is required."}, status=400)

        try:
            category = Category.objects.get(category_name=category_name)
        except Category.DoesNotExist:
            return Response({"error": f"Category '{category_name}' does not exist."}, status=404)

        attributes = CategoryAttributes.objects.filter(category=category)
        serializer = CategoryAttributeSerializer(attributes, many=True)
        return Response(serializer.data)
