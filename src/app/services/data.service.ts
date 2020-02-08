import { Injectable } from '@angular/core';
import {Navlink} from '../model/navlink';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getNavLinks() {
    const navLinks = new Array<Navlink>();

    const navLink1 = new Navlink();
    navLink1.label = 'About us';
    navLink1.path = '';
    const navLink2 = new Navlink();
    navLink2.label = 'Catalog';
    navLink2.path = 'books';
    const navLink3 = new Navlink();
    navLink3.label = 'Forum';
    navLink3.path = 'posts';

    navLinks.push(navLink1);
    navLinks.push(navLink2);
    navLinks.push(navLink3);
    return of(navLinks)
  }
}
