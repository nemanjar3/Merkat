from django import forms
from .models import User, Listing, Category

# Form for creating a User profile
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password', 'user_name', 'user_surname', 'tel_num', 'store_name', 'email']

# Form for creating a Listing
class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ['category', 'title', 'description', 'price', 'status', 'location']
