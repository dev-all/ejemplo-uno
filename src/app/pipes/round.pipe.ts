import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: any, decimals: any): any {
    if (!value) return 0;

    var num = value;
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

    return with2Decimals;
  }
}
