import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  createListing(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/listings/create/`, payload);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category_attributes/list-all/`);
  }

  deleteListing(listingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/listings/delete/${listingId}`);
  }

  updateListing(listingId: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/listings/update/${listingId}`, payload);
  }

  getAllListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listings/`);
  }

}
