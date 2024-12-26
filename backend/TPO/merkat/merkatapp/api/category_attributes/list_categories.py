from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from merkatapp.models import Category
from ..serializers.category_attr_serializers import CategorySerializer

class CategoryListAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List all categories",
        responses={200: CategorySerializer(many=True)},
    )
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
