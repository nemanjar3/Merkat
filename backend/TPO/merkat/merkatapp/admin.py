from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import (
    User, Category, Listing, SubCategory, Image, Store, 
    SellerInStore, Message, CategoryAttributes, SubCategoryAttributes, 
    ListingAttributeValue,
)


class ListingAttributeValueInline(admin.TabularInline):
    model = ListingAttributeValue
    extra = 1 

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "attribute":
            if 'category' in request.resolver_match.kwargs:
                category_id = request.resolver_match.kwargs['category']
                kwargs["queryset"] = CategoryAttributes.objects.filter(category_id=category_id)
        
        if db_field.name == "subcategory_attribute":
            if 'subcategory' in request.resolver_match.kwargs:
                subcategory_id = request.resolver_match.kwargs['Subcategory']
                kwargs["queryset"] = SubCategoryAttributes.objects.filter(subcategory_id=subcategory_id)
        
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ListingAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'subcategory', 'price', 'user', 'posted_date')
    inlines = [ListingAttributeValueInline]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "subcategory":
            if request.POST.get('Category'):
                kwargs["queryset"] = SubCategory.objects.filter(category_id=request.POST.get('Category'))
        
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Listing, ListingAdmin)
admin.site.register(SubCategory)
admin.site.register(Image)
admin.site.register(Store)
admin.site.register(SellerInStore)
admin.site.register(Message)
admin.site.register(CategoryAttributes)
admin.site.register(SubCategoryAttributes)

