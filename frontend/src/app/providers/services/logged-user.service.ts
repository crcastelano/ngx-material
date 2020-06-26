import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export enum Role {
  SUPERUSUARIO = 'admin',
}

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {

  private userInfoSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userInfoAsync: Observable<any> = this.userInfoSubject.asObservable();

  userRoles: Role[] = [];

  /**
   * Creates an instance of LoggedUserService.
   *
   * @param {HttpService} http
   * @memberof LoggedUserService
   */
  constructor(
    private apollo: Apollo,
  ) { }

  meQuery = gql`
    query me {
      me{
        nome
        sobrenome
        roles {
          name
        }
        permissions {
          name
        }
      }
    }
  `;

  public getLoggedUser(): Observable<any> {
    return this.apollo.query<any>({
      query: this.meQuery,
    }).pipe(pluck('data', 'me'),
    tap((userInfo: any) => {
      this.userInfoSubject.next(userInfo);
      this.userRoles = userInfo.roles.map(role => role.name);
    }),
    );
  }

  hasRoles(roles: Role[]): boolean {
    return this.userRoles.some(role => roles.includes(role));
  }

  isSuperusuario(): boolean {
    return this.hasRoles([Role.SUPERUSUARIO]);
  }
}
