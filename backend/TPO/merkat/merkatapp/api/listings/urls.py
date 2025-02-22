from django.urls import path
from .create import ListingCreateAPI
from .update import ListingUpdateAPI
from .delete import ListingDeleteAPI
from .list_all import ListingListAPI
from .get_listing import GetListingByIdAPI
from .delete_listing_image import DeleteListingImageView
from .createImages import ListingImageCreateAPIView
from .createText import ListingTextCreateAPIView


urlpatterns = [
    path('create/', ListingCreateAPI.as_view(), name='listing-create'),
    path('delete/<int:pk>/', ListingDeleteAPI.as_view(), name='listing-delete'), 
    path('', ListingListAPI.as_view(), name='listing-list'),
    path('update/<int:listing_id>/', ListingUpdateAPI.as_view(), name='listing-update'),
    path('<int:listing_id>/', GetListingByIdAPI.as_view(), name='get-listing-by-id'),
    path('delete-listing-image/', DeleteListingImageView.as_view(), name='delete-listing-image'),
    path('create-text/', ListingTextCreateAPIView.as_view(), name='create-listing-text'),
    path('add-images/', ListingImageCreateAPIView.as_view(), name='add-listing-images'),
]
