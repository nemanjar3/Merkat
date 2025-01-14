import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;


  getUserByID(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/profile/${userId}/`)
      .pipe(
        map(user => {
          console.log('User:', user);
          return user; 
        })
      );
  }
 

}
