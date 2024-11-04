import { Component, input } from '@angular/core';
import {
  AvatarCircleComponent,
  SvgIconComponent,
  TagComponent,
} from '@tt/common-ui';
import { Community } from '../../../../data';
import { FormatNamesPipe } from '../../../../ui/pipes';

@Component({
  selector: 'tt-communities-list-item',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    TagComponent,
    FormatNamesPipe,
  ],
  templateUrl: './communities-list-item.component.html',
  styleUrl: './communities-list-item.component.scss',
})
export class CommunitiesListItemComponent {
  community = input<Community>();
}
