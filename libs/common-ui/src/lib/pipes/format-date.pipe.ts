import { Pipe, PipeTransform } from '@angular/core';
import { ru } from 'date-fns/locale';
import { formatDistance } from 'date-fns/formatDistance';

@Pipe({
  standalone: true,
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  public transform(date: Date | number | string) {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    if (!date) return '';

    if (typeof date === 'string') return date;

    return formatDistance(date, utcDate, {
      locale: ru,
      addSuffix: true,
    });
  }
}
