from rest_framework import serializers
from merkatapp.models import Listing, Category, SubCategory, ListingAttributeValue, CategoryAttributes, SubCategoryAttributes, Image


class ListingAttributeInputSerializer(serializers.Serializer):
    attribute_name = serializers.CharField()
    value = serializers.CharField()

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']

class ListingCreateSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  
    subcategory = serializers.CharField(required=False, allow_null=True)  
    attributes = ListingAttributeInputSerializer(many=True, required=False) 
    user_id = serializers.IntegerField()  
    images = serializers.ListField(
        child=serializers.ImageField(),
        required=False,
        allow_empty=True,
        write_only=True
    )  

    class Meta:
        model = Listing
        fields = ['user_id', 'category', 'subcategory', 'title', 'description', 'price', 'location', 'attributes', 'images']

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

        for attr in value:
            if 'attribute_name' not in attr or 'value' not in attr:
                raise serializers.ValidationError("Each attribute must have 'attribute_name' and 'value'.")
        return value

    def create(self, validated_data):
        attributes_data = validated_data.pop('attributes', [])
        images_data = validated_data.pop('images', [])  
        category = validated_data.pop('category')
        subcategory = validated_data.pop('subcategory', None)

        listing = Listing.objects.create(category=category, subcategory=subcategory, **validated_data)

        for attr_data in attributes_data:
            attribute_name = attr_data['attribute_name']
            value = attr_data['value']

            category_attr = CategoryAttributes.objects.filter(category=category, attribute_name=attribute_name).first()
            subcategory_attr = SubCategoryAttributes.objects.filter(subcategory=subcategory, attribute_name=attribute_name).first()

            if category_attr:
                ListingAttributeValue.objects.create(listing=listing, attribute=category_attr, value=value)
            elif subcategory_attr:
                ListingAttributeValue.objects.create(listing=listing, subcategory_attribute=subcategory_attr, value=value)
            else:
                raise serializers.ValidationError(f"Attribute '{attribute_name}' does not exist for the given category or subcategory.")
            
        # pokemon, biram tebe  
        if not images_data:
            default_image_path = 'media/listings_images/pokemon.jpg'
            Image.objects.create(listing=listing, image=default_image_path)
        # cuvaj sikeeeeee
        for image in images_data:
            Image.objects.create(listing=listing, image=image)

        return listing


class ListingDeleteSerializer(serializers.Serializer):
    listing_id = serializers.IntegerField()

    def validate_listing_id(self, value):
        try:
            listing = Listing.objects.get(pk=value)
        except Listing.DoesNotExist:
            raise serializers.ValidationError(f"Listing with ID {value} does not exist.")
        return value
    

class ListingTextCreateSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  
    subcategory = serializers.CharField(required=False, allow_null=True)  
    attributes = ListingAttributeInputSerializer(many=True, required=False)  
    user_id = serializers.IntegerField()  

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

        for attr in value:
            if 'attribute_name' not in attr or 'value' not in attr:
                raise serializers.ValidationError("Each attribute must have 'attribute_name' and 'value'.")
        return value

    def create(self, validated_data):
        attributes_data = validated_data.pop('attributes', [])
        category = validated_data.pop('category')
        subcategory = validated_data.pop('subcategory', None)

        listing = Listing.objects.create(category=category, subcategory=subcategory, **validated_data)

        for attr_data in attributes_data:
            attribute_name = attr_data['attribute_name']
            value = attr_data['value']

            category_attr = CategoryAttributes.objects.filter(category=category, attribute_name=attribute_name).first()
            subcategory_attr = SubCategoryAttributes.objects.filter(subcategory=subcategory, attribute_name=attribute_name).first()

            if category_attr:
                ListingAttributeValue.objects.create(listing=listing, attribute=category_attr, value=value)
            elif subcategory_attr:
                ListingAttributeValue.objects.create(listing=listing, subcategory_attribute=subcategory_attr, value=value)
            else:
                raise serializers.ValidationError(f"Attribute '{attribute_name}' does not exist for the given category or subcategory.")

        return listing


class ListingImageCreateSerializer(serializers.Serializer):
    listing_id = serializers.IntegerField()
    images = serializers.ListField(
        child=serializers.ImageField(),
        required=True
    )

    def validate_listing_id(self, value):
        try:
            Listing.objects.get(pk=value)
        except Listing.DoesNotExist:
            raise serializers.ValidationError(f"Listing with ID {value} does not exist.")
        return value

    def create(self, validated_data):
        listing = Listing.objects.get(pk=validated_data['listing_id'])
        images_data = validated_data['images']

        for image in images_data:
            Image.objects.create(listing=listing, image=image)

        return listing
