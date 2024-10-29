import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { PostFeedComponent } from '@tt/posts';

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
    AsyncPipe,
    ProfileHeaderComponent,
    SvgIconComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);
  subcribers$ = this.profileService.getSubscribersShortList(5);

  isMyPage = signal<boolean>(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
