from django.urls import path
from .list_categories import CategoryListAPI
from .list_subactegories import SubCategoryListAPI
from .list_attributes import CategoryAttributeListAPI
from .list_subattributes import SubCategoryAttributeListAPI

urlpatterns = [
    path('categories/', CategoryListAPI.as_view(), name='categories'),
    path('categories/subcategories/', SubCategoryListAPI.as_view(), name='subcategories'),
    path('categories/attributes/', CategoryAttributeListAPI.as_view(), name='category-attributes'),
    path('subcategories/attributes/', SubCategoryAttributeListAPI.as_view(), name='subcategory-attributes'),
]
