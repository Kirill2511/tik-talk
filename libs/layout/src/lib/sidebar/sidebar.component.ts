import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';

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
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  subcribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
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

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
