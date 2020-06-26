import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export function formatDate(momentFormat: string): (source: Observable<string|null>) => Observable<string> {
  const formats = ['YYYY-MM-DD', 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss'];
  return (source: Observable<string|null>) =>
    source.pipe(map(date => date ? moment(date, formats).format(momentFormat) : date));
}
