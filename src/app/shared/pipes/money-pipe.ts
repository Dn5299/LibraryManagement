import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true
})
export class MoneyPipe implements PipeTransform {

  transform(value: number | null | undefined): string {

    if (value == null) {

      return '0 đ';

    }

    return value.toLocaleString('vi-VN') + ' đ';

  }

}