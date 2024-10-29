import { Component, forwardRef, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../data';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DadataSuggestion } from '../../data/interfaces/dadata.interface';

@Component({
  selector: 'tt-address-input',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();
  addressForm = new FormGroup({
    city: new FormControl(),
    street: new FormControl(),
    building: new FormControl(),
  });

  isDropdownOpened = signal<boolean>(false);

  #dadataService = inject(DadataService);

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((val) => {
      return this.#dadataService.getSuggestions(val).pipe(
        tap((res) => {
          this.isDropdownOpened.set(!!res.length);
        })
      );
    })
  );

  setDisabledState(isDisabled: boolean): void {}

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any) {}

  onTouched() {}

  onSuggestionPick(suggestion: DadataSuggestion) {
    this.isDropdownOpened.set(false);
    /*this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
    this.onChange(city);*/

    this.addressForm.patchValue({
      city: suggestion.data.city,
      street: suggestion.data.street,
      building: suggestion.data.house,
    });
  }
}
