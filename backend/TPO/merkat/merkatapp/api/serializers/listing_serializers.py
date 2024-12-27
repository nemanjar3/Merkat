from rest_framework import serializers
from merkatapp.models import Listing, Category, SubCategory, ListingAttributeValue, CategoryAttributes, SubCategoryAttributes


class ListingAttributeInputSerializer(serializers.Serializer):
    attribute_name = serializers.CharField()
    value = serializers.CharField()

class ListingCreateSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  
    subcategory = serializers.CharField(required=False, allow_null=True)  
    attributes = ListingAttributeInputSerializer(many=True, required=False)  
    user_id = serializers.IntegerField()  # dodato da moze user da se poveze za listing iako nije online zbog swaggera
    class Meta:
        model = Listing
        fields = ['user_id', 'category', 'subcategory', 'title', 'description', 'price', 'location', 'attributes']

    def validate_category(self, value):
        try:
            return Category.objects.get(category_name=value)
        except Category.DoesNotExist:
            raise serializers.ValidationError(f"Category with name '{value}' does not exist.")

    def validate_subcategory(self, value):
        if not value:
            return None
        try:
            return SubCategory.objects.get(subcategory_name=value)
        except SubCategory.DoesNotExist:
            raise serializers.ValidationError(f"Subcategory with name '{value}' does not exist.")

    def validate_attributes(self, value):
        if not value:
            return []

        # Validate each attribute
        for attr in value:
            if 'attribute_name' not in attr or 'value' not in attr:
                raise serializers.ValidationError("Each attribute must have 'attribute_name' and 'value'.")
        return value

    def create(self, validated_data):
        attributes_data = validated_data.pop('attributes', [])
        category = validated_data.pop('category')
        subcategory = validated_data.pop('subcategory', None)

        # Create the listing
        listing = Listing.objects.create(category=category, subcategory=subcategory, **validated_data)

        # Process attributes and subattributes
        for attr_data in attributes_data:
            attribute_name = attr_data['attribute_name']
            value = attr_data['value']

            # Check if the attribute is a category or subcategory attribute
            category_attr = CategoryAttributes.objects.filter(category=category, attribute_name=attribute_name).first()
            subcategory_attr = SubCategoryAttributes.objects.filter(subcategory=subcategory, attribute_name=attribute_name).first()

            if category_attr:
                ListingAttributeValue.objects.create(listing=listing, attribute=category_attr, value=value)
            elif subcategory_attr:
                ListingAttributeValue.objects.create(listing=listing, subcategory_attribute=subcategory_attr, value=value)
            else:
                raise serializers.ValidationError(f"Attribute '{attribute_name}' does not exist for the given category or subcategory.")

        return listing


class ListingDeleteSerializer(serializers.Serializer):
  listing_id = serializers.IntegerField()

  def validate_listing_id(self, value):
    try:
      listing = Listing.objects.get(pk=value)
    except Listing.DoesNotExist:
      raise serializers.ValidationError(f"Listing with ID {value} does not exist.")
    return value
