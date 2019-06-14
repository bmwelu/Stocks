import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelper, private router: Router) {
  }
  public canActivate(): boolean {
    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    if (token === null) {
        return false;
    }
    if (token !== null && this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('jwt');
        this.router.navigate(['login']);
        return false;
    }
    return true;
  }
  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  public logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
