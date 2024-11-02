import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tt-stack-input',
  standalone: true,
  imports: [SvgIconComponent, FormsModule, AsyncPipe],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public placeholder = input<string>('Добавьте тег');
  #disabled = signal<boolean>(false);

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled();
  }

  onChange(value: string[] | null) {}

  onTouched() {}

  handleInputConfirm(): void {
    if (this.innerInput && this.value$.value.indexOf(this.innerInput) === -1) {
      const newValue = [...this.value$.value, this.innerInput];
      this.value$.next(newValue);
      this.onChange(newValue);
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
    this.#disabled.set(isDisabled);
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  onTagDelete(i: number) {
    const tags = [...this.value$.value];
    tags.splice(i, 1);
    this.value$.next(tags);
    this.onChange(tags);
  }

  showInput() {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }
}
