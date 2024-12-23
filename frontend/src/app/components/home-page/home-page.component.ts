import { Component, OnInit } from '@angular/core';
import { OglasService } from '../../services/oglas.service';
import { Oglas } from '../../shared/models/Oglas'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
@Component({
    standalone: true,
    selector: 'app-homepage',
    imports: [CommonModule, NavbarButtonComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomepageComponent implements OnInit {
  oglasi: Oglas[] = [];

  constructor(private oglasService: OglasService, private router: Router) {}

  ngOnInit() {
    this.oglasi = this.oglasService.getAll();
  }
  prikaziDetalje(oglas: any) {
    this.router.navigate(['', oglas.id]); // Pretpostavljamo da oglas ima ID
  }

}
