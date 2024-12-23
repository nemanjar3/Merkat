
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OglasService } from '../../services/oglas.service';
import { CommonModule } from '@angular/common';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { UserService } from '../../services/user-service.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/User';
@Component({
  selector: 'app-oglas-detalji',
  standalone: true,
  imports: [CommonModule, NavbarButtonComponent, TranslateModule, RouterModule],
  templateUrl: './oglas-detalji.component.html',
  styleUrl: './oglas-detalji.component.scss'
})
export class OglasDetaljiComponent implements OnInit, AfterViewInit {
  oglas: any;
  user!: User;
  constructor(private oglasService: OglasService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const oglasId = params.get('id');
      
      this.oglas = this.oglasService.getByID(Number(oglasId));
    });
    this.user = this.userService.getLoggedUser();
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
