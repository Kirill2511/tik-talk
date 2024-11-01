import { Component, inject } from '@angular/core';
import { StackInputComponent, TtInputComponent } from '@tt/common-ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { communityActions } from '../../../../data';

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
    { id: '1', name: 'Программирование', value: 'PROGRAMMING' },
    { id: '2', name: 'Технология', value: 'TECHNOLOGY' },
    { id: '3', name: 'Образование', value: 'EDUCATION' },
    { id: '4', name: 'Спорт', value: 'SPORT' },
    { id: '5', name: 'Другое', value: 'OTHER' },
  ];

  constructor() {
    this.searchFormSub = this.formSearch.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        map((formValue) => this.filterNullValues(formValue))
      )
      .subscribe((formValue) => {
        this.store.dispatch(
          communityActions.filterEvents({ filters: formValue })
        );
      });
  }

  private filterNullValues(formValue: { [key: string]: any }): {
    [key: string]: any;
  } {
    return Object.keys(formValue).reduce((acc, key) => {
      if (formValue[key] !== null) {
        acc[key] = formValue[key];
      }
      return acc;
    }, {} as { [key: string]: any });
  }
}
