import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private loggedUserService: LoggedUserService,
  ) { }

  canLoad(route: Route, previousUrl: UrlSegment[]): Observable<boolean> {
    return this.loggedUserService.getLoggedUser().pipe(
      tap(() => {
        this.authService.previousUrl = null;
        this.authService.appLoaded = true;
      }),
      catchError(error => this.forceLogout(previousUrl)),
      mapTo(true),
    );
  }

  forceLogout(previousUrl: UrlSegment[]): Observable<boolean> {
    this.authService.previousUrl = previousUrl;
    this.authService.logout();
    return observableOf(false);
  }
}
