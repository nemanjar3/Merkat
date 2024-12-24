import { Component } from '@angular/core';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [NavbarButtonComponent, CommonModule, MatButtonModule, LanguageSelectorComponent, TranslateModule, RouterModule]
})

export class NavbarComponent {
  navbarButtons = [
    { text: 'homePage', routerLink: '/' },
    { text: 'stores', routerLink: '/prodavnice' },
    { text: 'marketing', routerLink: '/marketing' },
    { text: 'help', routerLink: '/pomoc' },
    // Add more buttons as needed
  ];
  isNavbarCollapsed = false;
  textLogin = "login"
  linkLogin = '/login'
  linkRegister = '/register'
  textRegister = "register"

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  closeNavbar() {
    this.isNavbarCollapsed = false;
  }
}