import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  login: string;
  password: string;
  isAuthenticated = false;
  loggedUser;
  panelValue = '';

  constructor(private authService: AuthService) {

  }



  ngOnInit() {
    this.initLoggedUser();
  }

  onLogin() {
    this.authService.authenticate(this.login, this.password);
    this.initLoggedUser();
  }

  initLoggedUser() {
    if (this.authService.isAuthenticated) {
      this.loggedUser = new User();
      this.loggedUser.id = this.authService.user.id;
      this.loggedUser.login = this.authService.user.login;
      this.loggedUser.password = this.authService.user.password;
      this.loggedUser.role = this.authService.user.role;
      this.loggedUser.bookLimit = this.authService.user.bookLimit;
    } else {
      return null;
    }
  }

  logOut() {
    this.authService.logout();
    this.loggedUser = null;
  }



}
