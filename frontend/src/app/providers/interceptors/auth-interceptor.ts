import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalState } from 'app/global.state';

/**
 * Intercepta um request, adiciona headers de autenticação
 * e concatena a url de acordo com o ambiente
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private globalState: GlobalState) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authInfo = JSON.parse(localStorage.getItem('auth_info'));
    const url = `${this.globalState.getApiURL()}${request.url}`;

    const setHeaders = {
      Accept: 'application/json',
      Authorization: authInfo ? `${authInfo.token_type} ${authInfo.auth_token}` : '',
    };

    const newRequest = request.clone({ url, setHeaders });

    return next.handle(newRequest);
  }
}
