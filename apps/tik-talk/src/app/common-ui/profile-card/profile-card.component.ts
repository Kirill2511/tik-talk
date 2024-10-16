import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe.pipe';

@Component({
  standalone: true,
  selector: 'profile-card',
  templateUrl: 'profile-card.component.html',
  styleUrl: 'profile-card.component.scss',
  imports: [ImgUrlPipe],
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
