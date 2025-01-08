import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
})
export class AddListingComponent implements OnInit {
  addListingForm!: FormGroup;
  categories: any[] = [];
  subcategories: any = {};
  attributes: any = {};

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addListingForm = this.fb.group({
      user_id: [{ value: '', disabled: true }, Validators.required], // Auto-fill from user context
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required]],
      location: [''],
      categories: this.fb.array([]), // Dynamic array for categories
    });

    this.loadCategories();
  }

  loadCategories() {
    this.listingService.getCategories().subscribe({
      next: (categories: any) => (this.categories = categories),
      error: (err: any) => console.error('Error loading categories:', err),
    });
  }

  addCategory() {
    const categoryGroup = this.fb.group({
      category: ['', Validators.required],
      subcategory: [''],
      attributes: this.fb.array([]),
    });

    (this.addListingForm.get('categories') as FormArray).push(categoryGroup);
  }

  onCategoryChange(index: number, event: Event) {
    const target = event.target as HTMLSelectElement; // Assert type to HTMLSelectElement
    const category = target.value;
  
    if (category) {
      this.listingService.getSubcategories(category).subscribe((subcategories) => {
        this.subcategories[category] = subcategories;
  
        const categoryGroup = (this.addListingForm.get('categories') as FormArray).at(index) as FormGroup;
        categoryGroup.patchValue({ subcategory: '' }); // Reset subcategory on change
      });
  
      this.listingService.getAttributes('category', category).subscribe((attributes) => {
        this.attributes[category] = attributes;
  
        const categoryGroup = (this.addListingForm.get('categories') as FormArray).at(index) as FormGroup;
        const attributesArray = categoryGroup.get('attributes') as FormArray;
  
        attributesArray.clear(); // Reset attributes
        attributes.forEach((attr: any) => {
          attributesArray.push(
            this.fb.group({
              attribute_name: [attr.name, Validators.required],
              value: ['', Validators.required],
            })
          );
        });
      });
    }
  }
  
  onSubcategoryChange(index: number, event: Event) {
    const target = event.target as HTMLSelectElement; // Assert type to HTMLSelectElement
    const subcategory = target.value;
  
    if (subcategory) {
      const category = (this.addListingForm.get('categories') as FormArray).at(index).get('category')?.value;
  
      this.listingService.getAttributes('subcategory', subcategory).subscribe((attributes) => {
        this.attributes[subcategory] = attributes;
  
        const categoryGroup = (this.addListingForm.get('categories') as FormArray).at(index) as FormGroup;
        const attributesArray = categoryGroup.get('attributes') as FormArray;
  
        attributesArray.clear(); // Reset attributes
        attributes.forEach((attr: any) => {
          attributesArray.push(
            this.fb.group({
              attribute_name: [attr.name, Validators.required],
              value: ['', Validators.required],
            })
          );
        });
      });
    }
  }
  

  submitForm() {
    if (this.addListingForm.valid) {
      const payload = this.addListingForm.getRawValue();
      this.listingService.createListing(payload).subscribe({
        next: () => {
          this.toastr.success('Listing created successfully');
          this.addListingForm.reset();
        },
        error: (err: any) => {
          console.error('Error creating listing:', err);
          this.toastr.error('Error creating listing');
        },
      });
    } else {
      this.toastr.error('Please fill out all required fields');
    }
  }

  get categoriesArray(): FormArray {
    return this.addListingForm.get('categories') as FormArray;
  }
}
