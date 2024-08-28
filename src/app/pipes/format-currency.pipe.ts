import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value?: number, currencySymbol: string = '$'): string {
    if ( !value || isNaN(value) ) {
      return '-';
    }

    const integerPart = Math.floor(value).toLocaleString('en-US');
    const decimalPart = (value % 1).toFixed(2).substring(2);
    return `${currencySymbol} ${integerPart}.${decimalPart}`;
  }

}
