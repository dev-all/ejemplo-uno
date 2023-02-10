import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

@Pipe({
  name: 'distinct'
})
export class DistinctPipe implements PipeTransform {

  transform(value: any[], propertie: any): any[] {
    const newArray = [];

    of<any>(...value)
      .pipe(distinct(d => d[propertie]))
      .subscribe((x) => {
        newArray.push(x);
      });

    return newArray;
  }

}
