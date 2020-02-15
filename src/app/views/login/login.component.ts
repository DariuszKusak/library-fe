import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: string;
  password: string;
  message = '';
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      result => {
        if (result) {
          const url = this.route.snapshot.queryParams['requested'];
          this.router.navigateByUrl(url);
        } else {
          this.message = 'Your username or login was not recognized. Try Again.'
        }
      }
    );
  }

  onLogin() {
    this.authService.authenticate(this.login, this.password)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
