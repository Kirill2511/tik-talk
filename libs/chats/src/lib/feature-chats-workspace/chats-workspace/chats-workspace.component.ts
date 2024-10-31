import { Component, inject } from '@angular/core';
import { ChatsWorkspaceHeaderComponent } from './chats-workspace-header/chats-workspace-header.component';
import { ChatsWorkspaceMessagesWrapperComponent } from './chats-workspace-messages-wrapper/chats-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, of, switchMap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MessageInputComponent } from '../../ui';
import { ChatsService } from '../../data';

@Component({
  selector: 'tt-chats-workspace',
  standalone: true,
  imports: [
    ChatsWorkspaceHeaderComponent,
    ChatsWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './chats-workspace.component.html',
  styleUrl: './chats-workspace.component.scss',
})
export class ChatsWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activeChats$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => !!userId),
          switchMap(({ userId }) => {
            return this.chatsService.createChat(userId).pipe(
              switchMap((chat) => {
                this.router.navigate(['chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }

      return timer(0, 60000).pipe(
        switchMap(() => this.chatsService.getChatById(id)),
        catchError((error) => {
          console.error('Error fetching chat:', error);
          return of(null);
        })
      );
    })
  );
}
