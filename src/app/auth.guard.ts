import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('UserID');

    if (userId) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Deny access
    }
  }
}
