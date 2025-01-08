from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import UserProfileForm, ListingForm
from .models import User, Category
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User

#http://127.0.0.1:8000/create-profile/

# NOTE: From here are some checkups to see if adding and 'login' and DB are working
def create_profile(request):
    if request.method == 'POST':
        profile_form = UserProfileForm(request.POST)
        listing_form = ListingForm(request.POST)

        if profile_form.is_valid() and listing_form.is_valid():
            # Create and save the user manually
            user = profile_form.save(commit=False)
            user.password = make_password(profile_form.cleaned_data['password'])  # Hash the password
            user.save()

            # Save the listing and associate it with the user
            listing = listing_form.save(commit=False)
            listing.user = user  # Set the user for the listing
            listing.save()

            return redirect('success')  # Redirect to a success page or the listing page
    else:
        profile_form = UserProfileForm()
        listing_form = ListingForm()

    return render(request, 'create_profile.html', {'profile_form': profile_form, 'listing_form': listing_form})

def success(request):
    return render(request, 'success.html')


# NOTE: From this point on are LOGIN and SIGNIN and PROFILE SHOW
def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user_name = request.POST['user_name']
        user_surname = request.POST['user_surname']
        email = request.POST['email']

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect('signup')

        user = User(username=username, password=password, user_name=user_name, user_surname=user_surname, email=email)
        user.save()
        messages.success(request, "Signup successful! Please log in.")
        return redirect('login')

    return render(request, 'signup.html')


from django.contrib.auth.hashers import check_password

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password):
                request.session['user_id'] = user.user_id 
                return redirect('profile')
            else:
                messages.error(request, "Invalid password.")
        except User.DoesNotExist:
            messages.error(request, "User does not exist.")

        return redirect('login')

    return render(request, 'login.html')

from .models import Listing

def profile(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = User.objects.get(user_id=user_id)
    listings = Listing.objects.filter(user=user)

    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        price = request.POST['price']
        category_id = request.POST['category']
        category = Category.objects.get(category_id=category_id)
        Listing.objects.create(user=user, title=title, description=description, price=price, category=category)

        messages.success(request, "Listing added successfully!")
        return redirect('profile')

    categories = Category.objects.all() 
    return render(request, 'profile.html', {'user': user, 'listings': listings, 'categories': categories})



def lobby(request):
    return render(request, 'lobby.html')


