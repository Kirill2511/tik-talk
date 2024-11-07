import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { themesOptions } from '../../../../data';
import { TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'tt-create-communities',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TtInputComponent],
  templateUrl: './communities-create.component.html',
  styleUrl: './communities-create.component.scss',
})
export class CommunitiesCreateComponent {
  protected readonly themesOptions = themesOptions;
}
