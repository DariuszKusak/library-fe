import {Component, OnInit} from '@angular/core';
import {Navlink} from '../model/navlink';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navLinks: Navlink[] = [
    {label: 'O nas', path: ''},
    {label: 'Katalog', path: 'catalog'},
    {label: 'Wypożyczalnia', path: 'usersBooks'},
    {label: 'Twoje ksiązki', path: 'posts'}
  ];


  constructor() {
  }

  ngOnInit() {
  }


}
