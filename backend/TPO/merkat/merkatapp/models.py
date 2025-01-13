from django.db import models
from django.contrib.auth.hashers import make_password
from django.utils.timezone import now

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=256, unique=True)
    password = models.CharField(max_length=1024)
    user_name = models.CharField(max_length=1024)
    user_surname = models.CharField(max_length=1024)
    active_ads = models.IntegerField(null=True)
    tel_num = models.CharField(max_length=1024, null=True, blank=True)
    store_name = models.CharField(max_length=1024, null=True, blank=True)
    email = models.CharField(max_length=1024)
    created_at = models.DateField(auto_now_add=True)
    profile_image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True,
        default='default_profile.jpg' # dodato
    )

    def save(self, *args, **kwargs):
        if not self.pk or 'pbkdf2_sha256$' not in self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=1024, null=True, blank=True)

    def __str__(self):
        return self.category_name

class SubCategory(models.Model):
    subcategory_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    subcategory_name = models.CharField(max_length=1024)

    def __str__(self):
        return self.subcategory_name

class CategoryAttributes(models.Model):
    category_attribute_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    attribute_name = models.CharField(max_length=1024)

    def __str__(self):
        return f"{self.category.category_name} - {self.attribute_name}"

class SubCategoryAttributes(models.Model):
    subcategory_attribute_id = models.AutoField(primary_key=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    attribute_name = models.CharField(max_length=1024)

    def __str__(self):
        return f"{self.subcategory.subcategory_name} - {self.attribute_name}"

class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.RESTRICT, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=True, blank=True)
    title = models.CharField(max_length=1024)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=0)
    posted_date = models.DateField(null=True, blank=True)
    updated_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=1024, null=True, blank=True)
    location = models.CharField(max_length=1024, null=True, blank=True)

    def __str__(self):
        return self.title

"""class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.RESTRICT)
    image_url = models.CharField(max_length=1024)

    def __str__(self):
        return self.image_url"""
class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.RESTRICT, related_name='images')
    image = models.ImageField(
        upload_to='listings_images/', 
        null=True,
        blank=True,
        default='media/listings_images/default_listing.jpg',
    )

    def __str__(self):
        return f"Image {self.image_id} for Listing {self.listing.title}"

class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    store_name = models.CharField(max_length=1024)
    store_description = models.TextField(null=True, blank=True)
    created_at = models.DateField()

    def __str__(self):
        return self.store_name

class SellerInStore(models.Model):
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)

    class Meta:
        unique_together = ('user', 'store')

    def __str__(self):
        return f"{self.user.username} in {self.store.store_name}"

class ChatRoom(models.Model):

    id = models.AutoField(primary_key=True)
    participants = models.ManyToManyField('User', related_name='chat_rooms')
    created_at = models.DateTimeField(auto_now_add=True)

    def create_room(user1, user2):

        room = ChatRoom.objects.filter(participants=user1).filter(participants=user2).first()
        if not room:
            room = ChatRoom.objects.create()
            room.participants.add(user1, user2)
        return room

    def __str__(self):
        participant_usernames = ", ".join([user.username for user in self.participants.all()])
        return f"ChatRoom ({participant_usernames})"


class Message(models.Model):

    sender = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    thread_name = models.CharField(null=True, blank=True, max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.timestamp}"

    class Meta:
        ordering = ['timestamp']

class ListingAttributeValue(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='attribute_values')
    attribute = models.ForeignKey(CategoryAttributes, on_delete=models.CASCADE, null=True, blank=True)
    subcategory_attribute = models.ForeignKey(SubCategoryAttributes, on_delete=models.CASCADE, null=True, blank=True)
    value = models.CharField(max_length=1024)
    
    def __str__(self):
        return f"{self.attribute.attribute_name if self.attribute else self.subcategory_attribute.attribute_name}: {self.value}"