import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  userLogged = false;
  hidePassword = true;
  message = 'Tylko zagolowani użytkownicy uprawnieni są do wypożyczania książęk.';

  constructor(private authService: AuthService) {
    this.authService.authenticationResultEvent.subscribe(
      result => {
        if (!result) {
          this.message = 'Podano błędny login, lub hasło. Spróbuj ponownie.'
        }
      }
    );
  }

  ngOnInit() {
    this.userLogged = this.authService.isAuthenticated;
  }

  onLogin() {
    this.authService.authenticate(this.login, this.password);
  }

}
