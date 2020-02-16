import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();

    if (role !== 'USER') {
      this.router.navigate(['login']);
    }
    return this.authService.isAuthenticated;
  }
}
