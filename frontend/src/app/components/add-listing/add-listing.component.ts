// Add Listing Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel, MatSelect, MatOption, MatSelectChange } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingService } from '../../services/listing.service';

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
    ReactiveFormsModule
  ]
})
export class AddListingComponent implements OnInit {
  listingForm: FormGroup;
  categories: any[] = [];
  // categories = [
  //   {
  //     name: 'Housing',
  //     attributes: ['General Attribute 1', 'General Attribute 2'],
  //     subcategories: [
  //       { name: 'House', attributes: ['Lot Size', 'Number of Floors'] },
  //       { name: 'Flat', attributes: ['Floor Level', 'Number of Rooms'] }
  //     ]
  //   },
  //   {
  //     name: 'Electronics',
  //     attributes: ['General Attribute 1', 'General Attribute 2'],
  //     subcategories: [
  //       { name: 'Phone', attributes: ['Brand', 'Battery Life'] },
  //       { name: 'Laptop', attributes: ['Processor', 'RAM'] }
  //     ]
  //   }
  // ];
  subcategories: string[] = [];
  selectedAttributes: string[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private listingService: ListingService) {
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
    this.listingService.getCategories()
      .subscribe({
        next: (categories: any[]) => {
          // Transform the categories data to the expected structure
          this.categories = categories.map(category => ({
            name: category.category.category_name,
            attributes: category.attributes.map((attr: any) => attr.attribute_name),
            subcategories: category.subcategories.map((subcategory: any) => ({
              name: subcategory.subcategory_name,
              attributes: subcategory.attributes.map((attr: any) => attr.attribute_name)
            }))
          }));
  
          console.log('Transformed Categories:', this.categories); // Log for debugging
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
          // Handle error, e.g., display an error message to the user
        },
        complete: () => {
          console.log('Category fetching complete');
        }
      });
  }
  

  get attributes(): FormArray {
    return this.listingForm.get('attributes') as FormArray;
  }

  onCategoryChange(event: MatSelectChange): void {
    this.subcategories = []; // Clear subcategories on category change
    this.selectedAttributes = []; // Clear attributes on category change
    this.attributes.clear(); // Clear existing attribute form controls
    this.listingForm.get('subcategory')?.setValue(''); // Clear subcategory selection

    const categoryName = event.value;
    const category = this.categories.find(cat => cat.name === categoryName);
    this.subcategories = category ? category.subcategories.map((sub: any) => sub.name) : [];
    this.selectedAttributes = category ? category.attributes : [];
    this.updateAttributesFormArray(this.selectedAttributes);
  }

  onSubCategoryChange(event: MatSelectChange): void {
    this.selectedAttributes = []; // Clear attributes on subcategory change

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

  showData(): void {
    console.log(this.listingForm.value);
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formData = this.listingForm.value;
      this.listingService.createListing(formData)
        .subscribe({
          next: (response) => {
            console.log('Listing created successfully:', response);
            // Handle success, e.g., display a success message to the user
          },
          error: (error) => {
            console.error('Error creating listing:', error);
            // Handle error, e.g., display an error message to the user
          },
          complete: () => {
            console.log('Listing creation complete');
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
