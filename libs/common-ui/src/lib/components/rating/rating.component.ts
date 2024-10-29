import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tt-rating',
  standalone: true,
  imports: [NgForOf, NgClass, SvgIconComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RatingComponent),
    },
  ],
  /*host: {
    class: 'tt-rating',
  },*/
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  value: null | undefined | number = null;

  disabled = signal<boolean | undefined>(false);
  /*stars = input<number>(5);*/

  @Input({ transform: numberAttribute }) stars = 5;

  starsArray: number[] = [];

  onChange: any;
  onTouched: any;

  readonly #cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.starsArray = [];
    for (let i = 0; i < this.stars; i++) {
      this.starsArray[i] = i;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean): void {
    this.disabled.set(value);
  }

  writeValue(value: any): void {
    this.value = value;
    this.#cd.detectChanges();
  }

  onOptionClick(event: MouseEvent, value: number | null | undefined) {
    if (this.disabled()) return;

    this.onOptionSelect(event, value);
  }

  onOptionSelect(event: MouseEvent, value: number | null | undefined) {
    if (value === this.value) {
      this.updateModel(event, null);
    } else {
      this.updateModel(event, value || null);
    }
  }

  private updateModel(event: MouseEvent, value: number | null) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
