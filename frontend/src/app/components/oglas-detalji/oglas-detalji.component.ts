
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OglasService } from '../../services/oglas.service';
import { CommonModule } from '@angular/common';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { UserService } from '../../services/user-service.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/User';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-oglas-detalji',
  standalone: true,
  imports: [CommonModule, NavbarButtonComponent, TranslateModule, RouterModule],
  templateUrl: './oglas-detalji.component.html',
  styleUrl: './oglas-detalji.component.scss'
})
export class OglasDetaljiComponent implements OnInit, AfterViewInit {
  oglas: any;
  user!: any;
  constructor(private oglasService: OglasService,
    private route: ActivatedRoute,
    private userService: UserService,
    private listingService: ListingService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const oglasId = params.get('id');

      if (oglasId) {
        this.listingService.getListingById(oglasId).subscribe((data: any) => {
          this.oglas = data;

          // Fetch user details after this.oglas is populated
          if (this.oglas?.user) {
            this.userService.getUserByID(this.oglas.user).subscribe(
              (user) => {
                this.user = user;
              },
              (error) => {
                console.error('Error fetching user:', error);
              }
            );
          }
        });
      } else {
        console.error('Oglas ID not found in URL.');
      }
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
