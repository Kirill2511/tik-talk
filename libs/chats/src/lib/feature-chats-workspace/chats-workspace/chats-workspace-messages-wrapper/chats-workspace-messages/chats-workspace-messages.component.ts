import { Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Message } from '../../../../data';

@Component({
  selector: 'tt-chats-workspace-messages',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-workspace-messages.component.html',
  styleUrl: './chats-workspace-messages.component.scss',
})
export class ChatsWorkspaceMessagesComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
