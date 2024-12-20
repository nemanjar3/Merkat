import { Injectable } from '@angular/core';
import { Oglas } from '../shared/models/Oglas';
@Injectable({
  providedIn: 'root'
})
export class OglasService {

  constructor() { }

  getAll(): Oglas[] {
      return[
        {
          id: 1,
          opis: 'Opis oglasa 1',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 1', 'Kategorija 2'],
          cijena: '100 KM'
        },
        {
          id: 2,
          opis: 'Nekakav malo duzi opis oglasa 2',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 2', 'Kategorija 3'],
          cijena: '200 KM'
        },
        {
          id: 3,
          opis: 'Jedan veoma dugacak opis oglasa 3 koji se proteze na vise redova',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 3'],
          cijena: '300 KM'
        },
        {
          id: 4,
          opis: 'Jedan opis oglasa koji je toliko dugacak da se proteze na vise redova ali ne samo na dva reda nego cak i na tri reda se proteze',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 4', 'Kategorija 5', 'Kategorija 6', 'Kategorija 7', 'Kategorija 8'],
          cijena: '400 KM'
        },
        {
          id: 5,
          opis: 'Opis oglasa 5',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 5'],
          cijena: '500 KM'
        },
        {
          id: 6,
          opis: 'Opis oglasa 6',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 6'],
          cijena: '600 KM'
        },
        {
          id: 7,
          opis: 'Opis oglasa 7',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 7'],
          cijena: '700 KM'
        },
        {
          id: 8,
          opis: 'Opis oglasa 8',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 8', 'Kategorija 9', 'Kategorija 10', 'Kategorija 11', 'Kategorija 12', 'Kategorija 13', 'Kategorija 14', 'Kategorija 15', 'Kategorija 16', 'Kategorija 17', 'Kategorija 18', 'Kategorija 19', 'Kategorija 20'],
          cijena: '800 KM'
        },
        {
          id: 9,
          opis: 'Opis oglasa 9',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 9'],
          cijena: '900 KM'
        },
        {
          id: 10,
          opis: 'Opis oglasa 10',
          slika: 'assets/images/oglasi/oglas1.jpg',
          kategorije: ['Kategorija 10'],
          cijena: '1000 KM'
        }
      ]
  }

}
