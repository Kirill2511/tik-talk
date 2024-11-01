import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNames',
  standalone: true,
})
export class FormatNamesPipe implements PipeTransform {
  private readonly translations: { [key: string]: string } = {
    PROGRAMMING: 'Программирование',
    TECHNOLOGY: 'Технология',
    EDUCATION: 'Образование',
    SPORT: 'Спорт',
    OTHER: 'Другое',
  };

  transform(value: unknown): string {
    if (typeof value === 'string' && value in this.translations) {
      return this.translations[value];
    }
    return '...';
  }
}
