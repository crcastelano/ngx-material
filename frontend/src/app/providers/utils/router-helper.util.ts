import { Observable, BehaviorSubject, combineLatest, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

export class RouterHelper {

  static getRouteSnapshotParams(activatedRoute: ActivatedRouteSnapshot|ActivatedRoute, name: string): any {
    if (activatedRoute instanceof ActivatedRoute) {
      activatedRoute = activatedRoute.snapshot;
    }

    const resolvedDataRoute = activatedRoute.pathFromRoot.find(route => route.data[name]);
    return resolvedDataRoute ? resolvedDataRoute.params : null;
  }

  static getRouteParams(activatedRoute: ActivatedRoute, name: string): any {
    const resolvedDataRoute = activatedRoute.pathFromRoot.find(route => route.snapshot.data[name]);
    return resolvedDataRoute ? resolvedDataRoute.params : null;
  }

  static getResolvedData(activatedRoute: ActivatedRoute, name: string): Observable<any|any[]> {
    const resolvedDataRoute = activatedRoute.pathFromRoot.find(route => route.snapshot.data[name]);
    return resolvedDataRoute ? resolvedDataRoute.data.pipe(map(data => data[name])) : observableOf(null);
  }

  static getSnapshotData(activatedRoute: ActivatedRouteSnapshot, name: string): any {
    const resolvedDataRoute = activatedRoute.pathFromRoot.find(route => route.data[name]);
    return resolvedDataRoute ? resolvedDataRoute.data[name] : null;
  }

  static updateResolvedData(activatedRoute: ActivatedRoute, name: string): BehaviorSubject<any> {
    const resolvedDataRoute = activatedRoute.pathFromRoot.find(route => route.snapshot.data[name]);
    return resolvedDataRoute.data as BehaviorSubject<any>;
  }

  static getMultiResolvedData(activatedRoute: ActivatedRoute, nameList: string[]): Observable<any[]> {
    const dataObservables = [];

    nameList.forEach(name => dataObservables.push(this.getResolvedData(activatedRoute, name)));

    return combineLatest(dataObservables);
  }

}
