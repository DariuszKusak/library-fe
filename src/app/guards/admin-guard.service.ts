import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role !== 'ADMIN') {
      this.router.navigate(['login']);
    }
    return this.authService.isAuthenticated;
  }
}
