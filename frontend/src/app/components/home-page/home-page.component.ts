import { Component, OnInit } from '@angular/core';
import { Oglas } from '../../shared/models/Oglas'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../../services/auth.service';
@Component({
    standalone: true,
    selector: 'app-homepage',
    imports: [CommonModule,
              NavbarButtonComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomepageComponent implements OnInit {
  oglasi: any[] = [];

  constructor(private listingService: ListingService, 
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.listingService.getAllListings().subscribe((data: Oglas[]) => {
      this.oglasi = data;
    });
  }
  prikaziDetalje(oglas: any) {
    this.router.navigate(['', oglas.listing_id]); // Pretpostavljamo da oglas ima ID
  }

}
