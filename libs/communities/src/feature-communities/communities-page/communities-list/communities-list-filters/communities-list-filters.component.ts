import { Component, inject } from '@angular/core';
import { StackInputComponent, TtInputComponent } from '@tt/common-ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { communityActions, themesOptions } from '../../../../data';
import { checkEmptyValue } from '@tt/shared';

interface SearchForm {
  themes: FormControl<string[] | null>;
  name: FormControl<string | null>;
  tags: FormControl<string[] | null>;
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

  formSearch = new FormGroup<SearchForm>({
    themes: new FormControl<string[] | null>(null),
    name: new FormControl<string | null>(null),
    tags: new FormControl<string[] | null>(null),
  });

  searchFormSub!: Subscription;

  protected readonly themesOptions = themesOptions;

  constructor() {
    this.searchFormSub = this.formSearch.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        map((formValue) => checkEmptyValue(formValue))
      )
      .subscribe((formValue) => {
        this.store.dispatch(
          communityActions.communityFilter({ filters: formValue })
        );
      });
  }
}
