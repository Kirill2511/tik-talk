import { createFeature, createReducer, on } from '@ngrx/store';
import { communityActions } from './actions';
import { Community } from '../interfaces/communities.interface';

export interface CommunityState {
  community: Community[];
  communityFilters: Record<string, any>;
  page: number;
  size: number;
}

export const initialState: CommunityState = {
  community: [],
  communityFilters: {},
  page: 1,
  size: 10,
};

export const communityFeature = createFeature({
  name: 'communityFeature',
  reducer: createReducer(
    initialState,
    on(communityActions.communityLoaded, (state, payload) => {
      return {
        ...state,
        community: state.community.concat(payload.community),
      };
    }),
    on(communityActions.filterEvents, (state, payload) => {
      return {
        ...state,
        community: [],
        communityFilters: payload.filters,
        page: 1,
      };
    }),
    on(communityActions.setPage, (state, payload) => {
      let page = payload.page;

      if (!page) page = state.page + 1;

      return {
        ...state,
        page,
      };
    })
  ),
});
