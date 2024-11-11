import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { communityActions, themesOptions } from '../../../../data';
import {
  ModalComponent,
  ModalService,
  StackInputComponent,
  TtInputComponent,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';

interface formGroup {
  themes: FormControl<string[] | null>;
  name: FormControl<string | null>;
  tags: FormControl<string[] | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'tt-create-communities',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TtInputComponent,
    ModalComponent,
    StackInputComponent,
  ],
  templateUrl: './communities-create.component.html',
  styleUrl: './communities-create.component.scss',
})
export class CommunitiesCreateComponent {
  modalService = inject(ModalService);
  store = inject(Store);

  form = new FormGroup<formGroup>({
    name: new FormControl<string>('', Validators.required),
    themes: new FormControl<string[] | null>(null, Validators.required),
    tags: new FormControl<string[] | null>(null, Validators.required),
    description: new FormControl<string>('', Validators.required),
  });

  protected readonly themesOptions = themesOptions;

  constructor() {
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value);
    });
  }

  createCommunity() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    const formValue = this.form.value;
    const themesArray = { ...formValue, themes: [formValue.themes] };

    this.store.dispatch(
      // @ts-ignore
      communityActions.communityCreate({ create: themesArray })
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
