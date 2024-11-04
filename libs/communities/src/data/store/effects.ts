import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { communityActions } from './actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommunitiesService } from '../services/communities.service';
import { selectCommunityFilters, selectCommunityPageable } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communityService = inject(CommunitiesService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.filterEvents, communityActions.setPage),
      withLatestFrom(
        this.store.select(selectCommunityFilters),
        this.store.select(selectCommunityPageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.communityService
          .filterCommunity({
            ...pageable,
            ...filters,
          })
          .pipe(
            map((res) =>
              communityActions.communityLoaded({ community: res.items })
            ),
            catchError((err: { statusText: string }) => {
              return of(
                communityActions.communityLoadFailed({
                  errorMsg: err.statusText,
                })
              );
            })
          );
      })
    );
  });
}
