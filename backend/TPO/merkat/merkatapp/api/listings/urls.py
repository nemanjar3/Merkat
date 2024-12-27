from django.urls import path
from .create import ListingCreateAPI
from .update import ListingUpdateAPI
from .delete import ListingDeleteAPI
from .list_all import ListingListAPI


urlpatterns = [
    path('listings/create/', ListingCreateAPI.as_view(), name='listing-create'),
    path('delete/<int:pk>/', ListingDeleteAPI.as_view(), name='listing-delete'),
    path('listings/', ListingListAPI.as_view(), name='listing-list'),
    path('listings/<int:listing_id>/update/', ListingUpdateAPI.as_view(), name='listing-update'),
]
