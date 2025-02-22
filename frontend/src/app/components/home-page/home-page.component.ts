import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [NavbarButtonComponent,
    CommonModule,
    TranslateModule,
    FormsModule],
})
export class HomepageComponent implements OnInit {
  oglasi: any[] = [];
  filteredListings: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];
  categoryData: any[] = []; // Store the entire category data from the API
  apiUrl = environment.apiUrl;
  // New variables for price range filtering
  priceFrom: number | null = null;
  priceTo: number | null = null;
  isFilterPanelHidden = false;


  constructor(private listingService: ListingService, private router: Router) { }

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
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = (event.target as Window).innerWidth;
    if (screenWidth > 600) {
      this.isFilterPanelHidden = false; // Always show panel for larger screens
    }
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
  toggleFilterPanel() {
    this.isFilterPanelHidden = !this.isFilterPanelHidden;
  }

  applyPriceFilter() {
    this.filteredListings = this.oglasi.filter((oglas) => {
      const price = oglas.price;
      const fromCondition = this.priceFrom === null || price >= this.priceFrom;
      const toCondition = this.priceTo === null || price <= this.priceTo;
      return fromCondition && toCondition;
    });
  }

  sortListings(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast EventTarget to HTMLSelectElement
    const order = target.value; // Access the value property

    if (order === 'asc') {
      this.filteredListings.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      this.filteredListings.sort((a, b) => b.price - a.price);
    }
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
    this.priceFrom = null;
    this.priceTo = null;
  }

  prikaziDetalje(oglas: any) {
    this.router.navigate(['', oglas.listing_id]);
  }
}
