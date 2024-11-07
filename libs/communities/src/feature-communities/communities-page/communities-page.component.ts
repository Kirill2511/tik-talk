import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  ],
  templateUrl: './communities-page.component.html',
  styleUrl: './communities-page.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesPageComponent {
  constructor(private modalService: ModalService) {}

  openDialog() {
    const dialogRef = this.modalService.openModal(CommunitiesCreateComponent);
    dialogRef.instance.close.subscribe(() => {
      this.modalService.closeDialog(dialogRef);
    });
  }
}
