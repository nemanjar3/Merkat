import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [NavbarButtonComponent, CommonModule],
})
export class HomepageComponent implements OnInit {
  oglasi: any[] = [];
  filteredListings: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];
  categoryData: any[] = []; // Store the entire category data from the API

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit() {
    this.listingService.getAllListings().subscribe((data) => {
      this.oglasi = data;
      this.filteredListings = data;
    });

    this.listingService.getCategories().subscribe((data: any[]) => {
      this.categoryData = data; // Store raw data for further filtering
      this.categories = data.map((item) => item.category); // Extract categories
    });
  }

  toggleCategoryFilter(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.updateSubcategories();
    this.applyFilters();
  }

  toggleSubcategoryFilter(subcategory: string) {
    const index = this.selectedSubcategories.indexOf(subcategory);
    if (index > -1) {
      this.selectedSubcategories.splice(index, 1);
    } else {
      this.selectedSubcategories.push(subcategory);
    }
    this.applyFilters();
  }

  updateSubcategories() {
    const relevantSubcategories = this.categoryData
      .filter((item) => this.selectedCategories.includes(item.category.category_name))
      .flatMap((item) => item.subcategories || []);

    this.subcategories = Array.from(new Set(relevantSubcategories.map((sub) => sub.subcategory_name)));
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
    this.subcategories = [];
    this.filteredListings = [...this.oglasi];
  }

  prikaziDetalje(oglas: any) {
    this.router.navigate(['', oglas.listing_id]);
  }
}
