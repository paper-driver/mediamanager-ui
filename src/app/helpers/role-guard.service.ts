import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');

    if (
      !this.currentUser || 
      this.currentUser.roles.indexOf(expectedRole) == -1 
    ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
