import { Component, inject } from '@angular/core';
import { StackInputComponent, TtInputComponent } from '@tt/common-ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { communityActions, themesOptions } from '../../../../data';

export interface FiltersFormValue {
  themes: string[] | null;
  name: string | null;
  tags: string[] | null;
}

@Component({
  selector: 'tt-communities-list-filters',
  standalone: true,
  imports: [StackInputComponent, TtInputComponent, ReactiveFormsModule],
  templateUrl: './communities-list-filters.component.html',
  styleUrl: './communities-list-filters.component.scss',
})
export class CommunitiesListFiltersComponent {
  store = inject(Store);

  formSearch = new FormGroup({
    themes: new FormControl<string[] | null>(null),
    name: new FormControl<string | null>(null),
    tags: new FormControl<string[] | null>(null),
  });

  searchFormSub!: Subscription;
  protected readonly themesOptions = [
    { id: '0', name: 'Все', value: '', selected: true },
    { id: '1', name: 'Программирование', value: CommunityThemes.PROGRAMMING },
    { id: '2', name: 'Технология', value: CommunityThemes.TECHNOLOGY },
    { id: '3', name: 'Образование', value: CommunityThemes.EDUCATION },
    { id: '4', name: 'Спорт', value: CommunityThemes.SPORT },
    { id: '5', name: 'Другое', value: CommunityThemes.OTHER },
  ];

  constructor() {
    this.searchFormSub = this.formSearch.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        map((formValue) => this.filterValues(formValue))
      )
      .subscribe((formValue) => {
        this.store.dispatch(
          communityActions.filterEvents({ filters: formValue })
        );
      });
  }

  private filterValues<T extends Record<string, any>>(
    formValue: T
  ): Partial<T> {
    return Object.keys(formValue).reduce((acc, key) => {
      const value = formValue[key];
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' &&
          value !== null &&
          Object.keys(value).length === 0)
      ) {
        return acc;
      }

      (acc as any)[key] = value;
      return acc;
    }, {} as Partial<T>);
  }

  /*private filterNullValues(
    formValue: Partial<FiltersFormValue>
  ): Partial<FiltersFormValue> {
    return (Object.keys(formValue) as Array<keyof FiltersFormValue>).reduce<
      Partial<FiltersFormValue>
    >((acc, key) => {
      if (formValue[key] !== null || formValue[key] === '') {
        // @ts-ignore
        acc[key] = formValue[key];
      }
      return acc;
    }, {});
  }*/

  /*private filterNullValues(
    formValue: Partial<FiltersFormValue>
  ): Partial<FiltersFormValue> {
    return Object.keys(formValue).reduce((acc, key) => {
      const value = formValue[key as keyof FiltersFormValue];
      if (value !== null && value !== undefined) {
        acc[key as keyof FiltersFormValue] = value as any;
      }
      return acc;
    }, {} as Partial<FiltersFormValue>);
  }*/
}
