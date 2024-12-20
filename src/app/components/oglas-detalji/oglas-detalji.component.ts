
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OglasService } from '../../services/oglas.service';
import { CommonModule } from '@angular/common';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
@Component({
  selector: 'app-oglas-detalji',
  standalone: true,
  imports: [CommonModule, NavbarButtonComponent],
  templateUrl: './oglas-detalji.component.html',
  styleUrl: './oglas-detalji.component.scss'
})
export class OglasDetaljiComponent implements OnInit {
  oglas: any;

  constructor(private oglasService: OglasService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const oglasId = params.get('id');
      
      this.oglas = this.oglasService.getByID(Number(oglasId));
      console.log(this.oglas.slika);
    });
  }
}
