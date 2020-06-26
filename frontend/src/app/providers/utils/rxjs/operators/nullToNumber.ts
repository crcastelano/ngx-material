import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function nullToNumber(): (source: Observable<number | null>) => Observable<number> {
  return (source: Observable<number | null>) => source.pipe(map(value => value ? value : 0));
}
