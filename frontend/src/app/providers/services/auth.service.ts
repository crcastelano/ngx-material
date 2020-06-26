import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  appLoaded: boolean;
  private url: any[];

  get previousUrl() {
    return this.url;
  }

  set previousUrl(urlSegments: UrlSegment[]) {
    this.url = urlSegments && urlSegments.map(urlSegment => urlSegment.path);
  }

  constructor(
    private router: Router,
  ) { }

  static setToken(auth): void {
    auth.token_type = 'Bearer';
    localStorage.setItem('auth_info', JSON.stringify(auth));
  }

  static getToken(): any {
    return JSON.parse(localStorage.getItem('auth_info'));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
