import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByID(userId: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/users/profile/${userId}/`)
      .pipe(
        map(user => {
          if (user.profile_image) {
            user.profile_image = `http://127.0.0.1:8000${user.profile_image}`;
          }
          console.log('User:', user);
          return user;
        })
      );
  }
  


  getLoggedUser(){
    return {
            id: 1,
            ime: 'Cigla',
            prezime: 'Mojcaric',
            username: 'korisnik',
            email: 'rokrupnik@gmail.com',
            telefon: '061234567',
            datumRegistracije: new Date(),
            oglasi: [{
              id: 2,
              naziv: 'Nekakav malo duzi naziv oglasa 2',
              opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              slika: 'assets/images/oglasi/oglas1.jpg',
              kategorije: ['Kategorija 2', 'Kategorija 3'],
              cijena: '200 KM'
            },
            {
              id: 3,
              naziv: 'Jedan veoma dugacak naziv oglasa 3 koji se proteze na vise redova',
              opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros',
              slika: 'assets/images/oglasi/oglas1.jpg',
              kategorije: ['Kategorija 3'],
              cijena: '300 KM'
            },
            {
              id: 4,
              naziv: 'Jedan naziv oglasa koji je toliko dugacak da se proteze na vise redova ali ne samo na dva reda nego cak i na tri reda se proteze',
              opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt. Nullam nec purus nec eros tincidunt tincidunt.',
              slika: 'assets/images/oglasi/oglas1.jpg',
              kategorije: ['Kategorija 4', 'Kategorija 5', 'Kategorija 6', 'Kategorija 7', 'Kategorija 8'],
              cijena: '400 KM'
            },
            {
              id: 5,
              naziv: 'Naziv oglasa 5',
              opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              slika: 'assets/images/oglasi/oglas1.jpg',
              kategorije: ['Kategorija 5'],
              cijena: '500 KM'
            }],
            slika: 'assets/images/user1.png'
          }
  }

}
