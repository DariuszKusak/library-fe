import {Component, OnInit} from '@angular/core';
import {Navlink} from '../model/navlink';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

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

  navLinks: Navlink[] = [this.navLink1, this.navLink2];

  message = '';
  loginValue = 'Zaloguj';
  loggedUser = null;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.authenticationResultUserEvent.subscribe(
      result => {
        this.getLoggedUser(result);
      }
    );

    this.authService.authenticationResultEvent.subscribe(
      result => {
        if (result) {
          const role = this.authService.getRole();
          if (role === 'USER') {
            this.navLinks = [this.navLink1, this.navLink2, this.navLink3];
            this.router.navigate(['usersBooks']);
          }
          if (role === 'ADMIN') {
            this.navLinks = [this.navLink1, this.navLink2, this.navLink4];
            this.router.navigate(['adminPanel']);
          }
        } else {
          this.message = 'Your username or login was not recognized. Try Again.';
          this.navLinks = [this.navLink1, this.navLink2];
        }
      }
    );
  }

  getLoggedUser(login: string) {
    this.dataService.getUserByLogin(login).subscribe(
      user => {
        this.loggedUser = user;
        this.loginValue = user.login;
      }
    );
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onLogout() {
      this.authService.logout();
      this.loggedUser = null;
      this.loginValue = 'Zaloguj';
      this.navLinks = [this.navLink1, this.navLink2];
      this.router.navigate(['login']);
  }
}
