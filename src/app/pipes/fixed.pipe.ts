import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed',
})
export class FixedPipe implements PipeTransform {
  transform(value: number, decimals: number): any {
    if (!value) return '0';

    return value.toFixed(decimals);
  }
}
