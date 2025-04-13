import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    if (value == null || isNaN(value)) {
      return '';
    }
    return `${currencySymbol}${value.toFixed(2)}`;
  }
}

