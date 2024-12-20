import { Component, OnInit } from '@angular/core';
import { OglasService } from '../../services/oglas.service';
import { Oglas } from '../../shared/models/Oglas'; 
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-homepage',
    imports: [CommonModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomepageComponent implements OnInit {
  oglasi: Oglas[] = [];

  constructor(private oglasService: OglasService) {}

  ngOnInit() {
    this.oglasi = this.oglasService.getAll();
  }

}
