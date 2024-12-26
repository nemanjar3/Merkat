from django.urls import path
from .create import ListingCreateAPI
#from .update import ListingUpdateAPIView
from .delete import ListingDeleteAPI


urlpatterns = [
    path('listings/create/', ListingCreateAPI.as_view(), name='listing-create'),
    #path('update/<int:pk>/', ListingUpdateAPIView.as_view(), name='listing-update'),
    path('delete/<int:pk>/', ListingDeleteAPI.as_view(), name='listing-delete'),
]
