// Create Listing Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
  imports: [CommonModule]
})
export class AddListingComponent implements OnInit {
  listingForm: FormGroup;
  categories = [
    { name: 'Housing', subcategories: ['House', 'Flat'], attributes: ['Size', 'Bedrooms'] },
    { name: 'Electronics', subcategories: ['Phone', 'Laptop'], attributes: ['Brand', 'Warranty'] }
  ];
  subcategories: string[] = [];
  selectedAttributes: string[] = [];


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.listingForm = this.fb.group({
      user_id: [authService.getUserId, Validators.required], // Assume user ID is retrieved from authentication context
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1024)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required]],
      location: ['', Validators.maxLength(1024)],
      category: ['', Validators.required],
      subcategory: [''],
      attributes: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get attributes(): FormArray {
    return this.listingForm.get('attributes') as FormArray;
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryName = target.value;
    const category = this.categories.find(cat => cat.name === categoryName);
    this.subcategories = category ? category.subcategories : [];
    this.selectedAttributes = category ? category.attributes : [];
    this.attributes.clear();
    this.selectedAttributes.forEach(attr => {
      this.attributes.push(
        this.fb.group({
          attribute_name: [attr, Validators.required],
          value: ['', Validators.required]
        })
      );
    });
  }
  

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formData = this.listingForm.value;
      console.log('Listing Created:', formData);
      // Call your API here to submit the listing
    } else {
      console.error('Form is invalid');
    }
  }
}
