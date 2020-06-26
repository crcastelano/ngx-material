import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter): any {

    return (filter && items)
      ? items.filter(item => item.key.indexOf(filter) !== -1)
      : items;
  }
}
