import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { differenceInHours, differenceInMinutes } from 'date-fns';

@Component({
  selector: 'tt-form-schedule',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-schedule.component.html',
  styleUrl: './form-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormScheduleComponent implements OnInit {
  schedule = input<any>();

  form = new FormGroup({
    atp: new FormControl<number | null>(null, Validators.required),
    numberRoute: new FormControl<number | null>(null, Validators.required),
    nameRoute: new FormControl<string | null>(null, Validators.required),
    timeFrom: new FormControl<string | null>(null, Validators.required),
    timeTo: new FormControl<string | null>(null, Validators.required),
    dayToPath: new FormControl<number | null>(null, Validators.required),
    timeToPath: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    countDaySale: new FormControl<number | null>(null, Validators.required),
    numberBus: new FormControl<string | null>(null, Validators.required),
    seatDistribution: new FormControl<number | null>(null, Validators.required),
    busClass: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    seat: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    busModel: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    typeSeat: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
  });

  ngOnInit() {
    const scheduleData = this.schedule();
    if (scheduleData) {
      this.form.setValue(scheduleData);
    }
    this.form
      .get('timeFrom')
      ?.valueChanges.subscribe(() => this.updateTimeToPath());
    this.form
      .get('timeTo')
      ?.valueChanges.subscribe(() => this.updateTimeToPath());
    this.form
      .get('numberBus')
      ?.valueChanges.subscribe(() => this.updateInfoBus());
  }

  updateInfoBus() {
    const numberBus = this.form.get('numberBus')?.value;
    if (numberBus === '1') {
      this.form.get('busClass')?.setValue('Большой');
      this.form.get('busModel')?.setValue('МАН');
      this.form.get('seat')?.setValue('50');
      this.form.get('typeSeat')?.setValue('29 сидя /21 стоя');
    } else if (numberBus === '2') {
      this.form.get('busClass')?.setValue('Малый');
      this.form.get('busModel')?.setValue('ПЕЖО');
      this.form.get('seat')?.setValue('15');
      this.form.get('typeSeat')?.setValue('15 сидя');
    } else {
      this.form.get('busClass')?.setValue(null);
      this.form.get('busModel')?.setValue(null);
      this.form.get('seat')?.setValue(null);
      this.form.get('typeSeat')?.setValue(null);
    }
  }

  updateTimeToPath() {
    const timeFromStr = this.form.get('timeFrom')?.value;
    const timeToStr = this.form.get('timeTo')?.value;

    if (timeFromStr && timeToStr) {
      const timeFrom = this.parseTime(timeFromStr);
      let timeTo = this.parseTime(timeToStr);

      if (timeTo < timeFrom) {
        timeTo = new Date(timeTo.getTime() + 24 * 60 * 60 * 1000);
      }

      const minutesDifference = differenceInMinutes(timeTo, timeFrom);
      const hoursDifference = differenceInHours(timeTo, timeFrom);

      const formattedHours = String(hoursDifference).padStart(2, '0');
      const formattedMinutes = String(minutesDifference % 60).padStart(2, '0');

      const timeToPathValue = `${formattedHours}:${formattedMinutes}`;

      this.form.get('timeToPath')?.setValue(timeToPathValue);
    } else {
      this.form.get('timeToPath')?.setValue(null);
    }
  }

  parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}
