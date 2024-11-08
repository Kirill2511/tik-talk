import {
  AfterViewInit,
  Component,
  inject,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ModalService } from '../../services';

@Component({
  selector: 'tt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [SvgIconComponent],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('contentContainer', { read: ViewContainerRef })
  contentContainer!: ViewContainerRef;

  @Input() contentComponent: any;
  modalService = inject(ModalService);

  ngAfterViewInit() {
    if (this.contentComponent) {
      this.contentContainer.clear();
      this.contentContainer.createComponent(this.contentComponent);
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
