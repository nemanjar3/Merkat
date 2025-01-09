from django.urls import path
from .create import ListingCreateAPI
from .update import ListingUpdateAPI
from .delete import ListingDeleteAPI
from .list_all import ListingListAPI
from .get_listing import GetListingByIdAPI


urlpatterns = [
    path('create/', ListingCreateAPI.as_view(), name='listing-create'),
    path('delete/<int:pk>/', ListingDeleteAPI.as_view(), name='listing-delete'),
    path('', ListingListAPI.as_view(), name='listing-list'),
    path('update/<int:listing_id>/', ListingUpdateAPI.as_view(), name='listing-update'),
    path('<int:listing_id>/', GetListingByIdAPI.as_view(), name='get-listing-by-id'),
]
