import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private container!: ViewContainerRef;
  #modalComponent = ModalComponent;

  setContainer(container: ViewContainerRef) {
    this.container = container;
  }

  openModal(contentComponent: any): ComponentRef<any> {
    if (!this.container) {
      throw new Error('Modal container is not set');
    }

    this.container.clear();

    const dialogRef: any = this.container.createComponent(this.#modalComponent);
    dialogRef.instance.contentComponent = contentComponent;

    return dialogRef;
  }

  closeDialog(componentRef: ComponentRef<any>) {
    componentRef.destroy();
  }
}
