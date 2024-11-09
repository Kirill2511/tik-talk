import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '@tt/profile';

@Component({
  standalone: true,
  selector: 'app-profile-card',
  templateUrl: 'profile-card.component.html',
  styleUrl: 'profile-card.component.scss',
  imports: [ImgUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
