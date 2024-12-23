from django.urls import path
from .create import ListingCreateAPI
#from .update import ListingUpdateAPIView
#from .delete import ListingDeleteAPIView


urlpatterns = [
    path('create/', ListingCreateAPI.as_view(), name='listing-create'),
    #path('update/<int:pk>/', ListingUpdateAPIView.as_view(), name='listing-update'),
    #path('delete/<int:pk>/', ListingDeleteAPIView.as_view(), name='listing-delete'),
]
