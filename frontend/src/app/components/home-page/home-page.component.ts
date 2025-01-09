import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../../services/auth.service';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [NavbarButtonComponent,
    CommonModule]
})
export class HomepageComponent implements OnInit {
  oglasi: any[] = [];
  filteredListings: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];

  constructor(
    private listingService: ListingService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.listingService.getAllListings().subscribe((data) => {
      this.oglasi = data;
      this.filteredListings = data; // Initialize filtered listings
      console.log("Filtered listings", this.filteredListings);
      console.log("Listings", this.oglasi);
    });

    this.listingService.getCategories().subscribe((data) => {
      console.log("Data", data);
      this.listingService.getCategories().subscribe((data: any[]) => {
        this.categories = data.map((item) => item.category); // Extract categories
        this.subcategories = data.flatMap((item) => item.subcategories); // Extract and flatten subcategories
  
        console.log('Categories:', this.categories);
        console.log('Subcategories:', this.subcategories);
      });

      console.log("Categories", this.categories);
      console.log("Subcategories", this.subcategories);
    });

  }

  toggleCategoryFilter(category: string) {
    this.toggleFilter(this.selectedCategories, category);
    this.applyFilters();
  }

  toggleSubcategoryFilter(subcategory: string) {
    this.toggleFilter(this.selectedSubcategories, subcategory);
    this.applyFilters();
  }

  toggleFilter(filterArray: string[], value: string) {
    const index = filterArray.indexOf(value);
    if (index > -1) {
      filterArray.splice(index, 1);
    } else {
      filterArray.push(value);
    }
  }

  applyFilters() {
    this.filteredListings = this.oglasi.filter((oglas) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(oglas.category.category_name);
      const matchesSubcategory =
        this.selectedSubcategories.length === 0 ||
        this.selectedSubcategories.includes(oglas.subcategory.subcategory_name);

      return matchesCategory && matchesSubcategory;
    });
  }

  resetFilters() {
    this.selectedCategories = [];
    this.selectedSubcategories = [];
    this.filteredListings = [...this.oglasi];
  }

  prikaziDetalje(oglas: any) {
    this.router.navigate(['', oglas.listing_id]);
  }
}
