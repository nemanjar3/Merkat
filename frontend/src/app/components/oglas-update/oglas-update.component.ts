import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormField, MatLabel, MatSelect, MatOption } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    ReactiveFormsModule]
})
export class OglasUpdateComponent implements OnInit {
  listingForm: FormGroup;
  categories: any[] = [];
  subcategories: string[] = [];
  selectedAttributes: string[] = [];
  listingId!: string | '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private listingService: ListingService,
    private toastr: ToastrService
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
          user_id: data.user_id,
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
            this.attributes.at(index).patchValue(attr);
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
      const formData = this.listingForm.value;
      this.listingService.updateListing(this.listingId, formData).subscribe({
        next: () => {
          this.toastr.success('Listing updated successfully');
          const userId = this.authService.getUserId();
          this.router.navigate(['/user',userId]); // Navigate to the listing page
        },
        error: (err) => {
          console.error('Error updating listing:', err);
          this.toastr.error('Failed to update listing');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
