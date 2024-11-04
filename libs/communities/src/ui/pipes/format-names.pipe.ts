import { Pipe, PipeTransform } from '@angular/core';
import { CommunityThemes } from '../../data';

@Pipe({
  name: 'formatNames',
  standalone: true,
})
export class FormatNamesPipe implements PipeTransform {
  private readonly translations: Record<CommunityThemes, string> = {
    [CommunityThemes.PROGRAMMING]: 'Программирование',
    [CommunityThemes.TECHNOLOGY]: 'Технология',
    [CommunityThemes.EDUCATION]: 'Образование',
    [CommunityThemes.SPORT]: 'Спорт',
    [CommunityThemes.OTHER]: 'Другое',
  };

  transform(value: unknown): string {
    if (typeof value === 'string' && value in this.translations) {
      return this.translations[value as CommunityThemes];
    }
    return '...';
  }
}
