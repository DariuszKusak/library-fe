import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();

    if(role !== 'ADMIN') {
      this.router.navigate(['login']);
    }
    return this.authService.isAuthenticated;
  }
}
