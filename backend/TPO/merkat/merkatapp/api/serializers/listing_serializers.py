from rest_framework import serializers
from ...models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['title', 'description', 'price', 'location', 'category']

    def create(self, validated_data):
        user = self.context['request'].user
        listing = Listing.objects.create(user=user, **validated_data)
        return listing