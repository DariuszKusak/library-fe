import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminUserGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role !== 'USER' && role !== 'ADMIN') {
      this.router.navigate(['login']);
    }
    return this.authService.isAuthenticated;
  }
}
