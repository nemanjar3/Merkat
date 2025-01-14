import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  apiUrl = environment.apiUrl;

 
  constructor(private http: HttpClient) {}

  createListing(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/listings/create/`, payload);
  }

  createListingNoImages(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/listings/create-text/`, payload);
  }
  addListingImages(listingId: string, images: File[]): Observable<any> {
    const formData = new FormData();

    formData.append('listing_id', listingId); // Include listingId in the payload
    images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.post(`${this.apiUrl}/api/listings/add-images/`, formData);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/category_attributes/list-all/`);
  }

  deleteListing(listingId: string): Observable<any> {
    const url = `${this.apiUrl}/api/listings/delete/${listingId}/`; // Construct the API URL
    const body = { listing_id: listingId }; // Payload
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Optional headers
  
    return this.http.request('DELETE', url, {
      body: body, // Pass the body here
      headers: headers,
    });
  }
   

  updateListing(listingId: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/listings/update/${listingId}/`, payload);
  }

  getAllListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/listings/`);
  }

  getListingById(listingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/listings/${listingId}/`);
  }

  deleteImage(imageUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/listings/delete-listing-image/`, { image_url: imageUrl });
  }

}
