import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { communityActions } from './actions';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { CommunitiesService } from '../services/communities.service';
import { selectCommunityFilters, selectCommunityPageable } from './selectors';
import { ModalService } from '@tt/common-ui';

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communityService = inject(CommunitiesService);
  modalService = inject(ModalService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        communityActions.communityFilter,
        communityActions.setPage,
        communityActions.communityCreateSuccessfully
      ),
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

  createCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.communityCreate),
      mergeMap((action) =>
        this.communityService.createCommunity(action.create).pipe(
          map(() => communityActions.communityCreateSuccessfully()),
          catchError((error) =>
            of(communityActions.communityCreateFailed({ errorMsg: error }))
          )
        )
      )
    );
  });

  closeModalAfterCreate = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(communityActions.communityCreateSuccessfully),
        tap(() => this.modalService.closeModal())
      );
    },
    { dispatch: false }
  );
}
