import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ChatsWorkspaceMessagesComponent } from './chats-workspace-messages/chats-workspace-messages.component';
import { firstValueFrom } from 'rxjs';
import { MessageInputComponent } from '../../../ui';
import { Chat, ChatsService, Message } from '../../../data';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { FormatDatePipe } from '@tt/common-ui';

@Component({
  selector: 'tt-chats-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatsWorkspaceMessagesComponent,
    MessageInputComponent,
    DatePipe,
    FormatDatePipe,
  ],
  templateUrl: './chats-workspace-messages-wrapper.component.html',
  styleUrl: './chats-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();

  messages = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(messageText, this.chat().id);
    /*await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );*/

    firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  groupMessagesByDate() {
    const messages = this.messages()
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .reduce((acc, message) => {
        const date = new Date(message.createdAt).toISOString().split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(message);
        return acc;
      }, {} as { [key: string]: Message[] });

    const utcDate = new Date().toISOString().split('T')[0];

    return Object.entries(messages).map(([date, messages]) => ({
      date: date === utcDate ? 'Сегодня' : format(new Date(date), 'dd.MM.yyyy'),
      messages,
    }));
  }
}
