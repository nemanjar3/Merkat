import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getLoggedUser(){
    return {
      id: 1,
      username: 'korisnik',
      slika: 'assets/images/user1.png'
    }
  }

}
