import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/User";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = 'Tylko zagolowani użytkownicy uprawnieni są do wypożyczania książęk.';
  successMessage = '';
  logIn = true;
  hidePassword;
  userLogged;
  isSending = false;

  constructor(private authService: AuthService,
              private dataService: DataService) {
    this.authService.authenticationResultEvent.subscribe(
      result => {
        if (!result) {
          this.errorMessage = 'Podano błędny login, lub hasło. Spróbuj ponownie.'
        }
      }
    );
  }

  ngOnInit() {
    this.userLogged = this.authService.isAuthenticated;
  }

  public loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  public newAccountForm: FormGroup = new FormGroup({
    newAccountLogin: new FormControl(''),
    newAccountName: new FormControl(''),
    newAccountLastName: new FormControl(''),
    newAccountEmail: new FormControl('')
  });

  onLogin() {
    this.authService.authenticate(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }

  createAccount() {
    this.clearMessages();
    this.isSending = true;
    let newUser = new User();
    newUser.login = this.newAccountForm.get('newAccountLogin').value;
    newUser.name = this.newAccountForm.get('newAccountName').value;
    newUser.lastName = this.newAccountForm.get('newAccountLastName').value;
    newUser.email = this.newAccountForm.get('newAccountEmail').value;
    newUser.bookLimit = '3';
    this.dataService.createAccount(newUser).subscribe(
      user => {
        this.successMessage = `Pomyślnie utworzono użytkownika ${user.login}, hasło wysłane na adres ${user.login}`;
        this.isSending = false;
      }, error => {
        if (error.error.status === 4444) {
          this.errorMessage = error.error.error;
          this.isSending = false;
        } else {
          this.errorMessage = error.error;
          this.isSending = false;
        }
      }
    );
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }


}
