import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { themesOptions } from '../../../../data';
import { ModalComponent, ModalService, TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-create-communities',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TtInputComponent, ModalComponent],
  templateUrl: './communities-create.component.html',
  styleUrl: './communities-create.component.scss',
})
export class CommunitiesCreateComponent {
  modalService = inject(ModalService);
  protected readonly themesOptions = themesOptions;

  closeModal() {
    this.modalService.closeModal();
  }
}
