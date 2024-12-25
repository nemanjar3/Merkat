import { Component, OnInit } from '@angular/core';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
    standalone: true,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [NavbarButtonComponent, 
              CommonModule, 
              MatButtonModule, 
              LanguageSelectorComponent, 
              TranslateModule, 
              RouterModule]
})

export class NavbarComponent implements OnInit {
  navbarButtons = [
    { text: 'homePage', routerLink: '/' },
    { text: 'stores', routerLink: '/prodavnice' },
    { text: 'marketing', routerLink: '/marketing' },
    { text: 'help', routerLink: '/pomoc' },
    // Add more buttons as needed
  ];

  isNavbarCollapsed = false;
  isUserMenuOpen = false;

  textLogin = "login"
  linkLogin = '/login'
  linkRegister = '/register'
  textRegister = "register"

  isLoggedIn = false;
  loggedInUserId: number | null = null; // Store user ID here

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    // Subscribe to the `isLoggedIn$` BehaviorSubject to get updates on login status
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.loggedInUserId = status ? this.authService.getUserId() : null; // Get user ID from AuthService
      console.log('User ID:', this.loggedInUserId);
    });
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  closeNavbar() {
    this.isNavbarCollapsed = false;
    this.isUserMenuOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.closeNavbar();
    this.router.navigate(['/']);
  }
}