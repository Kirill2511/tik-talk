import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { profileActions, selectFilteredProfiles } from '../../data';
import { ProfileFiltersComponent } from '..';
import { Store } from '@ngrx/store';
import { InfiniteScrollTriggerComponent } from '@tt/common-ui';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'tt-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  /*profilesSubject$ = new Subject<Profile[]>();

  infiniteProfiles$ = this.profilesSubject$.pipe(
    scan((acc, curr) => {
      return acc.concat(curr) as Profile[];
    }, [] as Profile[])
  );*/

  page = 0;

  /*  ngOnInit() {
    this.getNextPage();
  }*/

  /*async getNextPage() {
    this.page += 1;
    const res = await firstValueFrom(
      this.profileService.filterProfiles({ page: this.page })
    );
    this.profilesSubject$.next(res.items);
  }*/

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;

    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }

  onScroll() {
    this.timeToFetch();
    /*this.getNextPage();*/
  }
}
