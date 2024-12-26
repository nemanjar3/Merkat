from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from merkatapp.models import SubCategoryAttributes, SubCategory
from ..serializers.category_attr_serializers import SubCategoryAttributeSerializer

class SubCategoryAttributeListAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List attributes for a given subcategory by name",
        manual_parameters=[
            openapi.Parameter(
                "subcategory_name",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Name of the subcategory",
                required=True,
            )
        ],
        responses={200: SubCategoryAttributeSerializer(many=True)},
    )
    def get(self, request):
        subcategory_name = request.query_params.get("subcategory_name")
        if not subcategory_name:
            return Response({"error": "Subcategory name is required."}, status=400)

        try:
            subcategory = SubCategory.objects.get(subcategory_name=subcategory_name)
        except SubCategory.DoesNotExist:
            return Response({"error": f"Subcategory '{subcategory_name}' does not exist."}, status=404)

        attributes = SubCategoryAttributes.objects.filter(subcategory=subcategory)
        serializer = SubCategoryAttributeSerializer(attributes, many=True)
        return Response(serializer.data)
