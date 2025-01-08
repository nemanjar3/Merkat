from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from merkatapp.models import Category, SubCategory, CategoryAttributes, SubCategoryAttributes
from ..serializers.category_attr_serializers import (
    CategorySerializer,
    SubCategorySerializer,
    CategoryAttributeSerializer,
    SubCategoryAttributeSerializer,
)

class ListAllAPI(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List all categories with attributes, subcategories, and subcategory attributes",
        responses={200: openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "category": openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                        "category_id": openapi.Schema(type=openapi.TYPE_INTEGER),
                        "category_name": openapi.Schema(type=openapi.TYPE_STRING),
                    }),
                    "attributes": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                            "category_attribute_id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "attribute_name": openapi.Schema(type=openapi.TYPE_STRING),
                        }),
                    ),
                    "subcategories": openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                            "subcategory_id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "subcategory_name": openapi.Schema(type=openapi.TYPE_STRING),
                            "attributes": openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Schema(type=openapi.TYPE_OBJECT, properties={
                                    "subcategory_attribute_id": openapi.Schema(type=openapi.TYPE_INTEGER),
                                    "attribute_name": openapi.Schema(type=openapi.TYPE_STRING),
                                }),
                            ),
                        }),
                    ),
                },
            ),
        )},
    )
    def get(self, request):
        categories = Category.objects.all()
        result = []

        for category in categories:
            # Get category attributes
            category_attributes = CategoryAttributes.objects.filter(category=category)
            category_attributes_data = CategoryAttributeSerializer(category_attributes, many=True).data

            # Get subcategories
            subcategories = SubCategory.objects.filter(category=category)
            subcategories_data = []

            for subcategory in subcategories:
                # Get subcategory attributes
                subcategory_attributes = SubCategoryAttributes.objects.filter(subcategory=subcategory)
                subcategory_attributes_data = SubCategoryAttributeSerializer(subcategory_attributes, many=True).data

                subcategories_data.append({
                    "subcategory_id": subcategory.subcategory_id,
                    "subcategory_name": subcategory.subcategory_name,
                    "attributes": subcategory_attributes_data,
                })

            result.append({
                "category": {
                    "category_id": category.category_id,
                    "category_name": category.category_name,
                },
                "attributes": category_attributes_data,
                "subcategories": subcategories_data,
            })

        return Response(result)
