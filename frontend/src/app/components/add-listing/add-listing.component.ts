import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel, MatSelect, MatOption, MatSelectChange } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AddListingComponent implements OnInit {
  listingForm: FormGroup;
  categories: any[] = [];
  subcategories: string[] = [];
  selectedAttributes: string[] = [];
  images: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private listingService: ListingService,
    private toastr: ToastrService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.listingForm = this.fb.group({
      user_id: [this.authService.getUserId()],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      location: [''],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      attributes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.listingService.getCategories().subscribe({
      next: (categories: any[]) => {
        this.categories = categories.map((category) => ({
          name: category.category.category_name,
          attributes: category.attributes.map((attr: any) => attr.attribute_name),
          subcategories: category.subcategories.map((subcategory: any) => ({
            name: subcategory.subcategory_name,
            attributes: subcategory.attributes.map((attr: any) => attr.attribute_name),
          })),
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  get attributes(): FormArray {
    return this.listingForm.get('attributes') as FormArray;
  }

  onCategoryChange(event: MatSelectChange): void {
    const category = this.categories.find((cat) => cat.name === event.value);
    this.subcategories = category ? category.subcategories.map((sub: any) => sub.name) : [];
    this.selectedAttributes = category ? category.attributes : [];
    this.updateAttributesFormArray(this.selectedAttributes);
  }

  onSubCategoryChange(event: MatSelectChange): void {
    const selectedCategory = this.categories.find((cat) =>
      cat.subcategories.some((sub: any) => sub.name === event.value)
    );
    const selectedSubcategory = selectedCategory?.subcategories.find((sub: any) => sub.name === event.value);
    const parentAttributes = selectedCategory?.attributes || [];
    const subcategoryAttributes = selectedSubcategory?.attributes || [];
    this.selectedAttributes = [...new Set([...parentAttributes, ...subcategoryAttributes])];
    this.updateAttributesFormArray(this.selectedAttributes);
  }

  private updateAttributesFormArray(attributes: string[]): void {
    this.attributes.clear();
    attributes.forEach((attr) => {
      this.attributes.push(
        this.fb.group({
          attribute_name: [attr, Validators.required],
          value: ['', Validators.required],
        })
      );
    });
  }

  onImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && this.images.length + files.length <= 5) {
      Array.from(files).forEach((file) => {
        this.images.push(file);
        const reader = new FileReader();
        reader.onload = () => this.imagePreviews.push(reader.result as string);
        reader.readAsDataURL(file);
      });
    } else {
      this.toastr.error('You can upload a maximum of 5 images.');
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formData = new FormData();
      Object.entries(this.listingForm.value).forEach(([key, value]) => {
        if (key === 'attributes') {
          formData.append(key, JSON.stringify(value));
        } else if (key !== 'images') {
          formData.append(key, value as string);
        }
      });


      // Add each file to the array
      this.images.forEach((image) => {
        formData.append('images', image); // Append all files under 'images'
      });

      console.log("Form submitted:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.listingService.createListing(formData).subscribe({
        next: () => {
          this.toastr.success('Listing created successfully');
          this.router.navigate(['/user', this.authService.getUserId()]);
        },
        error: (error) => {
          console.error('Error creating listing:', error);
        },
      });
    }
  }
}
