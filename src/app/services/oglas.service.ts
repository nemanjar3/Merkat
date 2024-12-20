import { Injectable } from '@angular/core';
import { Oglas } from '../shared/models/Oglas';
@Injectable({
  providedIn: 'root'
})
export class OglasService {

  constructor() { }

  oglasi: Oglas[] = [
    {
      id: 1,
      naziv: 'Naziv oglasa 1',
      opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 1', 'Kategorija 2'],
      cijena: '100 KM'
    },
    {
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
    },
    {
      id: 6,
      naziv: 'Naziv oglasa 6',
      opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 6'],
      cijena: '600 KM'
    },
    {
      id: 7,
      naziv: 'Naziv oglasa 7',
      opis: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 7'],
      cijena: '700 KM'
    },
    {
      id: 8,
      naziv: 'Naziv oglasa 8',
      opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 8', 'Kategorija 9', 'Kategorija 10', 'Kategorija 11', 'Kategorija 12', 'Kategorija 13', 'Kategorija 14', 'Kategorija 15', 'Kategorija 16', 'Kategorija 17', 'Kategorija 18', 'Kategorija 19', 'Kategorija 20'],
      cijena: '800 KM'
    },
    {
      id: 9,
      naziv: 'Naziv oglasa 9',
      opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 9'],
      cijena: '900 KM'
    },
    {
      id: 10,
      naziv: 'Naziv oglasa 10',
      opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      slika: 'assets/images/oglasi/oglas1.jpg',
      kategorije: ['Kategorija 10'],
      cijena: '1000 KM'
    }  ];

  //function to get one oglas by id
  getByID(id: number): Oglas {
      const oglas = this.oglasi.find(oglas => oglas.id === id);
      if (!oglas) {
          throw new Error(`Oglas with id ${id} not found`);
      }
      console.log(oglas.slika);
      return oglas;
  }

  getAll(): Oglas[] {
      return this.oglasi;
  }

}
