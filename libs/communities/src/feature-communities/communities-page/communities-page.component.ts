import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StackInputComponent, SvgIconComponent } from '@tt/common-ui';
import { CommunitiesListComponent } from './communities-list/communities-list.component';

@Component({
  selector: 'tt-communities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StackInputComponent,
    SvgIconComponent,
    CommunitiesListComponent,
  ],
  templateUrl: './communities-page.component.html',
  styleUrl: './communities-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesPageComponent {}
