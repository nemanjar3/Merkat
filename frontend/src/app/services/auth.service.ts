import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user';
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if the user is logged in when service is initialized
    const token = localStorage.getItem(this.tokenKey);
    this.isLoggedIn$.next(!!token);
  }

  saveUser(data: any) {
    localStorage.setItem(this.tokenKey, data.tokens.access);
    localStorage.setItem(this.userKey, JSON.stringify(data.username));
    this.isLoggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn$.next(false);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }
}
