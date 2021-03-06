import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {User} from '../model/User';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  loginSubscription: Subscription;
  validateSubscription: Subscription;
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  authenticationResultUserEvent = new EventEmitter<string>();
  jwtToken: string;
  user: User;

  constructor(private dataService: DataService) {
  }

  authenticate(login: string, password: string) {
    this.validateSubscription = this.dataService.validateUser(login, password).subscribe(
      next => {
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultUserEvent.emit(this.getUserLoginFromToken());
        this.authenticationResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  getUserLoginFromToken() {
    if (this.jwtToken == null) {
      return null;
    }
    const encodedPayload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).user;
  }

  getUser() {
    if (this.jwtToken == null) {
      return null;
    }
    const encodedPayload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    this.loginSubscription = this.dataService.getUserByLogin(JSON.parse(payload).user).subscribe(
      usr => {
        this.user = usr;
      }
    );
  }

  getRole(): string {
    if (this.jwtToken == null) {
      return null;
    }
    const encodedPayload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }

  logout() {
    this.dataService.logout().subscribe();
    this.isAuthenticated = false;
  }

  ngOnDestroy(): void {
    this.validateSubscription.unsubscribe();
  }


}
