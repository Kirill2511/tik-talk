import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tt-stack-input',
  standalone: true,
  imports: [SvgIconComponent, FormsModule, AsyncPipe],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([]);
  innerInput = '';
  inputVisible = false;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  #disabled = false;

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled;
  }

  handleInputConfirm(): void {
    if (this.innerInput && this.value$.value.indexOf(this.innerInput) === -1) {
      this.value$.next([...this.value$.value, this.innerInput]);
    }
    this.innerInput = '';
    this.inputVisible = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  onChange(value: string[] | null) {}

  onTouched() {}

  onTagDelete(i: number) {
    const tags = this.value$.value;
    tags.splice(i, 1);
    this.value$.next(tags);
    this.onChange(this.value$.value);
  }

  showInput() {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }
}
