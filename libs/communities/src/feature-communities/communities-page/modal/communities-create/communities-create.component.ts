import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  communityActions,
  CommunityThemes,
  themesOptions,
} from '../../../../data';
import {
  ModalComponent,
  ModalService,
  StackInputComponent,
  TtInputComponent,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';

interface formGroup {
  themes: FormControl<CommunityThemes[] | null>;
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
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    themes: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
    tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  protected readonly themesOptions = themesOptions;

  createCommunity() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();
    const themesArray = {
      ...formValue,
      themes: [formValue.themes] as unknown as CommunityThemes[],
    };

    this.store.dispatch(
      communityActions.communityCreate({ create: themesArray })
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
