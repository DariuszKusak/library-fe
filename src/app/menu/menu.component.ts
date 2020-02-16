import {Component, OnInit} from '@angular/core';
import {Navlink} from '../model/navlink';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navLink1 = {label: 'O nas', path: ''};
  navLink2 = {label: 'Katalog', path: 'catalog'};
  navLink3 = {label: 'Twoje Książki', path: 'usersBooks'};
  navLink4 = {label: 'Panel Administratora', path: 'adminPanel'};
  navLink5 = {label: 'Panel Użytkownika', path: 'login'};

  navLinks: Navlink[] = [this.navLink1, this.navLink2, this.navLink5];

  message = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.authenticationResultEvent.subscribe(
      result => {
        if (result === 'USER') {
          this.navLinks = [this.navLink1, this.navLink2, this.navLink3, this.navLink5];
          this.router.navigate(['usersBooks']);
        }
        if (result === 'ADMIN') {
          this.navLinks = [this.navLink1, this.navLink2, this.navLink4, this.navLink5];
          this.router.navigate(['adminPanel']);
        }
        else {
          this.message = 'Your username or login was not recognized. Try Again.';
        }
      }
    );
  }


}
