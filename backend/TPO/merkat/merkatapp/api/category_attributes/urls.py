from django.urls import path
from .list_categories import CategoryListAPI
from .list_subactegories import SubCategoryListAPI
from .list_attributes import CategoryAttributeListAPI
from .list_subattributes import SubCategoryAttributeListAPI
from .list_all import ListAllAPI

urlpatterns = [
    path('categories/', CategoryListAPI.as_view(), name='categories'),
    path('subcategories/', SubCategoryListAPI.as_view(), name='subcategories'),
    path('attributes/', CategoryAttributeListAPI.as_view(), name='category-attributes'),
    path('subcategories/attributes/', SubCategoryAttributeListAPI.as_view(), name='subcategory-attributes'),
    path('list-all/', ListAllAPI.as_view(), name='list-all'),
]
