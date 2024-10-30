import { Component, inject } from '@angular/core';
import { FormScheduleComponent } from '../form-schedule/form-schedule.component';
import { MockService } from '../experimental/mock.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tt-forms-group',
  standalone: true,
  imports: [FormScheduleComponent, AsyncPipe],
  templateUrl: './forms-group.component.html',
  styleUrl: './forms-group.component.scss',
})
export class FormsGroupComponent {
  mockService = inject(MockService);

  schedule$ = this.mockService.getSchedule();
}
