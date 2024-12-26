from rest_framework import serializers
from ...models import Category, SubCategory, CategoryAttributes, SubCategoryAttributes

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'category_name']


class SubCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.category_name", read_only=True)

    class Meta:
        model = SubCategory
        fields = ['subcategory_id', 'subcategory_name', 'category_name']


class CategoryAttributeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.category_name", read_only=True)

    class Meta:
        model = CategoryAttributes
        fields = ['category_attribute_id', 'attribute_name', 'category_name']


class SubCategoryAttributeSerializer(serializers.ModelSerializer):
    subcategory_name = serializers.CharField(source="subcategory.subcategory_name", read_only=True)

    class Meta:
        model = SubCategoryAttributes
        fields = ['subcategory_attribute_id', 'attribute_name', 'subcategory_name']

