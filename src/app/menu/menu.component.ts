import {Component, OnDestroy, OnInit} from '@angular/core';
import {Navlink} from '../model/navlink';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  nLinkHome = {label: 'O nas', path: ''};
  nLinkCatalog = {label: 'Katalog', path: 'catalog'};
  nLinkUserBooks = {label: 'Twoje Książki', path: 'usersBooks'};
  nLinkAdminPanel = {label: 'Panel Administratora', path: 'adminPanel'};

  navLinks: Navlink[] = [this.nLinkHome, this.nLinkCatalog];

  authSubscription: Subscription;
  message = '';
  loginValue = 'Zaloguj';
  infoLogin = '';
  loggedUser = null;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.authenticationResultUserEvent.subscribe(
      result => {
        this.getLoggedUser(result);
      }
    );

    this.authService.authenticationResultEvent.subscribe(
      result => {
        if (result) {
          const role = this.authService.getRole();
          if (role === 'USER') {
            this.navLinks = [this.nLinkHome, this.nLinkCatalog, this.nLinkUserBooks];
            this.infoLogin = "Informacje o użytkowniku";
            this.router.navigate(['usersBooks']);
          }
          if (role === 'ADMIN') {
            this.navLinks = [this.nLinkHome, this.nLinkAdminPanel];
            this.router.navigate(['adminPanel']);
            this.infoLogin = "Informacje o administratorze";
          }
        } else {
          this.message = 'Your username or login was not recognized. Try Again.';
          this.navLinks = [this.nLinkHome, this.nLinkCatalog];
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
      this.navLinks = [this.nLinkHome, this.nLinkCatalog];
      this.router.navigate(['login']);
  }

  navigateToUserInfo() {
    this.router.navigate(['userInformation'], {queryParams: {userLogin: this.loggedUser.login}});
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
