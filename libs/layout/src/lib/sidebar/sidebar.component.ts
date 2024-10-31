import { Component, effect, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { ChatsService } from '@tt/chats';

@Component({
  selector: 'tt-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    SubscriberCardComponent,
    AsyncPipe,
    RouterLinkActive,
    NgForOf,
    NgIf,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  subcribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems: { label: string; icon: string; link: string; count?: string }[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
      count: '',
    },
    {
      label: 'Формы',
      icon: 'radical',
      link: 'forms',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  constructor() {
    effect(() => {
      this.menuItems[1].count = this.chatsService.count();
    });
  }

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.chatsService.connectWs().subscribe();
  }
}
