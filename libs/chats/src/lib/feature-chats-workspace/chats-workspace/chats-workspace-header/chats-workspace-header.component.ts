import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/profile';

@Component({
  selector: 'tt-chats-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-workspace-header.component.html',
  styleUrl: './chats-workspace-header.component.scss',
})
export class ChatsWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
