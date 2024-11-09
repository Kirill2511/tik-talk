import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private container!: ViewContainerRef;
  private modalRef!: ComponentRef<ModalComponent>;

  setContainer(container: ViewContainerRef) {
    this.container = container;
  }

  openModal(contentComponent: any): ComponentRef<any> {
    if (!this.container) {
      throw new Error('Modal container is not set');
    }

    this.container.clear();

    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.contentComponent = contentComponent;
    return this.modalRef;
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.destroy();
    }
  }
}
