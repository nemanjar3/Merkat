import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormField, MatLabel, MatSelect, MatOption } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-oglas-update',
  templateUrl: './oglas-update.component.html',
  styleUrls: ['./oglas-update.component.scss'],
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule]
})
export class OglasUpdateComponent implements OnInit {
  listingForm: FormGroup;
  categories: any[] = [];
  subcategories: string[] = [];
  selectedAttributes: string[] = [];
  listingId!: string | '';
  images: File[] = [];
  imagePreviews: string[] = [];
  imagesToDelete: string[] = [];
  fetchedImages: string[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(ListingService) private listingService: ListingService
  ) {
    this.listingForm = this.fb.group({
      user_id: [this.authService.getUserId()],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      location: [''],
      category: ['', Validators.required],
      subcategory: [''],
      attributes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const listingId = this.route.snapshot.paramMap.get('id');
    if (listingId) {
      this.listingId = listingId;

      // Fetch categories first, then fetch the listing data
      this.listingService.getCategories().subscribe({
        next: (categories: any[]) => {
          this.categories = categories.map(category => ({
            name: category.category.category_name,
            attributes: category.attributes.map((attr: any) => attr.attribute_name),
            subcategories: category.subcategories.map((subcategory: any) => ({
              name: subcategory.subcategory_name,
              attributes: subcategory.attributes.map((attr: any) => attr.attribute_name)
            }))
          }));

          // Fetch the listing data once categories are ready
          this.fetchListingData(this.listingId);
        },
        error: (err) => console.error('Error fetching categories:', err)
      });
    } else {
      console.error('Listing ID not found in URL.');
    }
  }


  fetchListingData(id: string): void {
    this.listingService.getListingById(id).subscribe({
      next: (data: any) => {
        // Populate form fields
        this.listingForm.patchValue({
          user_id: data.user,
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          category: data.category.category_name,
          subcategory: data.subcategory.subcategory_name
        });

        // Trigger category change to populate subcategories and attributes
        this.onCategoryChange({ value: data.category.category_name });

        // Trigger subcategory change if subcategory exists
        if (data.subcategory && data.subcategory.subcategory_name) {
          this.onSubCategoryChange({ value: data.subcategory.subcategory_name });
        }

        // Populate attributes if available
        if (data.attributes) {
          this.updateAttributesFormArray(data.attributes.map((attr: any) => attr.attribute_name));
          data.attributes.forEach((attr: any, index: number) => {
            this.attributes.at(index).patchValue({
              attribute_name: attr.attribute_name,
              value: attr.value
            });
          });
        }

 
        // Load existing images into the preview array
        if (data.images && Array.isArray(data.images)) {
          this.imagePreviews = data.images.map((imgUrl: string) => {
            // Add base URL to image URL if it's not already a full URL
            if (!imgUrl.startsWith('http://') && !imgUrl.startsWith('https://')) {
              imgUrl = `${this.apiUrl}${imgUrl}`;
              this.fetchedImages.push(imgUrl);
            }
            return imgUrl;
          });
        }

      },
      error: (err: any) => console.error('Error fetching listing data:', err)
    });
  }


  get attributes(): FormArray {
    return this.listingForm.get('attributes') as FormArray;
  }

  onCategoryChange(event: { value: string }): void {
    const categoryName = event.value;
    const category = this.categories.find(cat => cat.name === categoryName);
    this.subcategories = category ? category.subcategories.map((sub: any) => sub.name) : [];
    this.selectedAttributes = category ? category.attributes : [];
    this.updateAttributesFormArray(this.selectedAttributes);
  }

  onSubCategoryChange(event: { value: string }): void {
    const subcategoryName = event.value;
    const selectedCategory = this.categories.find(cat =>
      cat.subcategories.some((sub: any) => sub.name === subcategoryName)
    );
    const selectedSubcategory = selectedCategory?.subcategories.find((sub: any) => sub.name === subcategoryName);

    const parentAttributes = selectedCategory?.attributes || [];
    const subcategoryAttributes = selectedSubcategory?.attributes || [];
    this.selectedAttributes = [...new Set([...parentAttributes, ...subcategoryAttributes])];

    this.updateAttributesFormArray(this.selectedAttributes);
  }

  private updateAttributesFormArray(attributes: string[]): void {
    this.attributes.clear();
    attributes.forEach(attr => {
      this.attributes.push(
        this.fb.group({
          attribute_name: [attr, Validators.required],
          value: ['', Validators.required]
        })
      );
    });
  }
  onImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && this.images.length + files.length + this.imagePreviews.length <= 5) {
      Array.from(files).forEach((file) => {
        //check if the image is fetched from the server
        if (!this.fetchedImages.includes(file.name)) {
          this.images.push(file);
        }
        const reader = new FileReader();
        reader.onload = () => this.imagePreviews.push(reader.result as string);
        reader.readAsDataURL(file);
      });
    } else {
      this.toastr.error('You can upload a maximum of 5 images.');
    }
  }


  removeImage(index: number): void {
    if (index < this.imagePreviews.length) {
      // Remove existing image and add its relative URL to the imagesToDelete list
      // const imageUrl = this.imagePreviews[index].replace(/^http:\/\/127\.0\.0\.1:8000\//, '');
      const imageUrl = this.imagePreviews[index].replace(/^.*?\/media\//, '/media/');
      //check if the image is fetched from the server
      if (this.fetchedImages.includes(this.imagePreviews[index])) {
        this.imagesToDelete.push(imageUrl);
        //remove the image from fetchedImages
        const fetchedIndex = this.fetchedImages.indexOf(this.imagePreviews[index]);
        this.fetchedImages.splice(fetchedIndex, 1);
      }
      this.imagePreviews.splice(index, 1);
    } else {
      // Remove newly added image
      const adjustedIndex = index - this.imagePreviews.length;
      this.images.splice(adjustedIndex, 1);
    }
  }



  deleteListing(): void {

    if (this.listingId) {
      this.listingService.deleteListing(this.listingId).subscribe({
        next: () => {
          this.toastr.success('Listing deleted successfully');
          const userId = this.authService.getUserId();
          this.router.navigate(['/user', userId]);
        },
        error: (err) => {
          console.error('Error deleting listing:', err);
          this.toastr.error('Failed to delete listing');
        }
      });
    } else {
      console.error('Listing ID not found');
    }

  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const listingData = {
        ...this.listingForm.value,
        attributes: this.attributes.value,
      };
  
      // Delete images marked for removal
      if (this.imagesToDelete.length > 0) {
        this.imagesToDelete.forEach((imageUrl) => {
          this.listingService.deleteImage(imageUrl).subscribe({
            error: (err) => console.error(`Failed to delete image at URL ${imageUrl}:`, err),
          });
        });
      }

      // Update listing data
      this.listingService.updateListing(this.listingId, listingData).subscribe({
        next: () => {
          // Add new images
          if (this.images.length > 0) {
            this.listingService.addListingImages(this.listingId, this.images).subscribe({
              next: () => {
                this.toastr.success('Listing updated successfully');
                this.router.navigate(['/user', this.authService.getUserId()]);
              },
              error: (err) => {
                console.error('Error uploading images:', err);
                this.toastr.error('Failed to upload images');
              },
            });
          } else {
            this.toastr.success('Listing updated successfully');
            this.router.navigate(['/user', this.authService.getUserId()]);
          }
        },
        error: (err) => {
          console.error('Error updating listing:', err);
          this.toastr.error('Failed to update listing');
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
  

}
