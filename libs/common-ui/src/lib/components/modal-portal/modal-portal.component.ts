import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../services';

@Component({
  selector: 'tt-modal-portal',
  template: `<ng-container #portalContainer></ng-container>`,
  standalone: true,
})
export class ModalPortalComponent implements AfterViewInit {
  @ViewChild('portalContainer', { read: ViewContainerRef })
  portalContainer!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
    this.modalService.setContainer(this.portalContainer);
  }
}
