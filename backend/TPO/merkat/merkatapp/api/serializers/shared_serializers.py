# serializers.py
from rest_framework import serializers
# from ...models import User
from ...models import User, Listing, Store, ListingAttributeValue, CategoryAttributes, SubCategoryAttributes
# from .listing_serializers import ListingSerializer


class ListingAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.SerializerMethodField()

    class Meta:
        model = ListingAttributeValue
        fields = ['attribute_name', 'value']

    def get_attribute_name(self, obj):
        if obj.attribute:
            return obj.attribute.attribute_name
        elif obj.subcategory_attribute:
            return obj.subcategory_attribute.attribute_name
        return None
    
# prije bilo u listing serializeru
from .shared_serializers import ListingAttributeValueSerializer

class ListingSerializer(serializers.ModelSerializer):
    attributes = ListingAttributeValueSerializer(many=True, source='attribute_values')  

    class Meta:
        model = Listing
        fields = ['listing_id', 'title', 'description', 'price', 'posted_date', 'status', 'location', 'attributes']
