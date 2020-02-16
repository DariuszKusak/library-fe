import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Observable, of} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<string>();
  are2 = new EventEmitter<User>();
  jwtToken: string;
  user: User;

  constructor(private dataService: DataService) {
  }

  authenticate(login: string, password: string) {
    this.dataService.validateUser(login, password).subscribe(
      next => {
        this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(this.getRole());
        this.are2.emit(this.getUser());
      }, error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(this.getRole());
      }
    );
  }

  getUser() {
    if (this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split(".")[1];
    const payload = atob(encodedPayload);
      this.dataService.getUserByLogin(JSON.parse(payload).user).subscribe(
      usr => {
        this.user = usr;
      }
    );
  }

  getRole(): string {
    if (this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split(".")[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }



}
