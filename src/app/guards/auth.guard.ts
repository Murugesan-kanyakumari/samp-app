import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isSessionExpired } from '../utils/core.util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && !isSessionExpired()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
