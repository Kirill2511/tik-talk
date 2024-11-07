import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

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

  @Output() close = new EventEmitter<void>();
  @Input() contentComponent: any;

  ngAfterViewInit() {
    if (this.contentComponent) {
      this.contentContainer.clear();
      this.contentContainer.createComponent(this.contentComponent);
    }
  }
}
