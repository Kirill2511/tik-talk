import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';
import { map, Observable, switchMap } from 'rxjs';
import { ProfileService } from '@tt/profile';
import { ChatWsService } from '../interfaces/chat-ws-service.interface';
import { AuthService } from '@tt/auth';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  me = inject(ProfileService).me;
  activeChatMessages = signal<Message[]>([]);
  count = signal<string>('');

  wsAdapter: ChatWsService = new ChatWsRxjsService();
  #authService = inject(AuthService);
  private http = inject(HttpClient);
  private baseApiUrl = '/yt-course/';
  private chatsApiUrl = `${this.baseApiUrl}chat/`;
  private messageApiUrl = `${this.baseApiUrl}message/`;

  connectWs() {
    return this.#authService.refreshTokenAndConnectWs().pipe(
      switchMap((res) => {
        return this.wsAdapter.connect({
          url: `${this.baseApiUrl}chat/ws`,
          token: res.access_token,
          handleMessage: this.handleWSMessage,
        }) as Observable<ChatWSMessage>;
      })
    );
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;

    if (isUnreadMessage(message)) {
      this.count.set(message.data.count.toString());
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsApiUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsApiUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsApiUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageApiUrl}send/${chatId}`,
      {},
      {
        params: { message },
      }
    );
  }
}
