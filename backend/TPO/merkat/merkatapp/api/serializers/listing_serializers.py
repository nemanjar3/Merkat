from rest_framework import serializers
from ...models import Listing
from .shared_serializers import ListingAttributeValueSerializer, ListingSerializer


"""class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['title', 'description', 'price', 'location', 'category']

    def create(self, validated_data):
        user = self.context['request'].user
        listing = Listing.objects.create(user=user, **validated_data)
        return listing"""
# vrati ako treba i posle importuj dje treba i kako treba
"""class ListingSerializer(serializers.ModelSerializer):
    attributes = ListingAttributeValueSerializer(many=True, source='attribute_values')  

    class Meta:
        model = Listing
        fields = ['listing_id', 'title', 'description', 'price', 'posted_date', 'status', 'location', 'attributes']"""



