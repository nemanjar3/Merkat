# serializers.py
from rest_framework import serializers
# from ...models import User
from ...models import User, Listing, Store, ListingAttributeValue, CategoryAttributes, SubCategoryAttributes
from .listing_serializers import ListingCreateSerializer
from .shared_serializers import ListingAttributeValueSerializer, ListingSerializer
from django.contrib.auth.hashers import make_password


# vrati ako treba posle izbrisi iz shared i importuju dje treba i kako treba
"""class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['listing_id', 'title', 'description', 'price', 'posted_date', 'status', 'location']"""

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['store_id', 'store_name', 'store_description', 'created_at']

class ProfileSerializer(serializers.ModelSerializer):
    listings = ListingSerializer(many=True, source='listing_set')  
    stores = StoreSerializer(many=True, source='store_set')        
    num_listings = serializers.SerializerMethodField()
    profile_image = serializers.ImageField(use_url=True) 

    class Meta:
        model = User
        fields = ['username', 'user_name', 'user_surname', 'email', 'tel_num', 'listings', 'num_listings', 'stores', 'profile_image'] 

    def get_num_listings(self, obj):
        return obj.listing_set.count()

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image:
            return request.build_absolute_uri(obj.profile_image.url)
        return None

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = User

        fields = ['username', 'password', 'user_name', 'user_surname', 'email', 'tel_num', 'store_name', 'profile_image'] 

    def create(self, validated_data):
        user = User(**validated_data)
        user.save()  # Password hashing happens in the model's save() method
        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=256)
    password = serializers.CharField(max_length=1024, write_only=True)

class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=256, required=False)


    class Meta:
        model = User
        fields = ['username', 'email', 'user_name', 'user_surname', 'tel_num', 'profile_image']

    def validate_username(self, value):
        if User.objects.filter(username=value).exclude(pk=self.instance.pk).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_password(self, value):
        return make_password(value) if value else value


