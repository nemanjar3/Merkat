import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private apiUrl = 'http://127.0.0.1:8000/api/listings';

  constructor(private http: HttpClient) {}

  createListing(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getSubcategories(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${category}/subcategories`);
  }

  getAttributes(type: 'category' | 'subcategory', name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${type}/${name}/attributes`);
  }
}
