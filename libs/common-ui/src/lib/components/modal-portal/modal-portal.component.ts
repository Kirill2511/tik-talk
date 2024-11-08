import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../services';

@Component({
  selector: 'tt-modal-portal',
  template: `<ng-container #modalContainer></ng-container>`,
  standalone: true,
})
export class ModalPortalComponent implements AfterViewInit {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
    this.modalService.setContainer(this.modalContainer);
  }
}
