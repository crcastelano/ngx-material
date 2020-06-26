import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ResolverHelper {

  constructor(
    private router: Router,
    private url: string = '/pages',
  ) { }

  protected checkResource(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError(error => this.redirect()),
    );
  }

  protected redirect(): Observable<any> {
    this.router.navigate([this.url]);
    return observableOf(false);
  }
}
