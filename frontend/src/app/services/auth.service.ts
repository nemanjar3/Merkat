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
    console.log(data.tokens);
    localStorage.setItem(this.tokenKey, data.tokens.access);
    localStorage.setItem(this.userKey, JSON.stringify(data));
    this.isLoggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn$.next(false);
  }

  getUser() {
    const userString = localStorage.getItem(this.userKey);
    if (userString) {
      const user: any = JSON.parse(userString); // Parse the user object
      return user; 
    }
    return null;
  }
  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.user_id : null; // Assuming 'id' is the property for user ID
  }
}
