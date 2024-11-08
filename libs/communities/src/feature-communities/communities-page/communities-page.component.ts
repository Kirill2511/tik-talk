import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ModalService,
  StackInputComponent,
  SvgIconComponent,
} from '@tt/common-ui';
import { CommunitiesListComponent } from './communities-list/communities-list.component';
import { CommunitiesCreateComponent } from './modal';

@Component({
  selector: 'tt-communities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StackInputComponent,
    SvgIconComponent,
    CommunitiesListComponent,
    CommunitiesCreateComponent,
  ],
  templateUrl: './communities-page.component.html',
  styleUrl: './communities-page.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesPageComponent {
  modalService = inject(ModalService);

  openModal() {
    this.modalService.openModal(CommunitiesCreateComponent);
  }
}
