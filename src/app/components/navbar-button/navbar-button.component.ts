import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '../../translate.service'; // Или путања до вашег сервиса
import { TranslateModule } from '@ngx-translate/core';



@Component({
    standalone: true,
    selector: 'app-navbar-button',
    imports: [RouterModule, MatButtonModule, TranslateModule],
    templateUrl: './navbar-button.component.html',
    styleUrl: './navbar-button.component.scss'
})
export class NavbarButtonComponent {
  @Input() text: string = '';
  @Input() routerLink: string | any[] = ''; // Use `routerLink` as per Angular conventions

  constructor(private translateService: TranslateService) {} // Додајте ово
}

