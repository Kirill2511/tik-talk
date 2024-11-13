import { createFeature, createReducer, on } from '@ngrx/store';
import { communityActions } from './actions';
import {
  Community,
  CommunityCreateDto,
} from '../interfaces/communities.interface';

export interface CommunityState {
  community: Community[];
  communityFilters: Record<string, any>;
  communityCreate: CommunityCreateDto | null;
  page: number;
  size: number;
  error: string | null;
  loading: boolean;
}

export const initialState: CommunityState = {
  community: [],
  communityFilters: {},
  communityCreate: null,
  page: 1,
  size: 10,
  error: null,
  loading: false,
};

export const communityFeature = createFeature({
  name: 'communityFeature',
  reducer: createReducer(
    initialState,
    on(communityActions.communityLoaded, (state, payload) => {
      return {
        ...state,
        community: payload.community,
        error: null,
      };
    }),
    on(communityActions.communityFilter, (state, payload) => {
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
    }),
    on(communityActions.communityLoadFailed, (state, payload) => {
      return {
        ...state,
        error: payload.errorMsg,
      };
    }),

    on(communityActions.communityCreate, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(communityActions.communityCreateSuccessfully, (state) => ({
      ...state,
      loading: false,
    })),
    on(communityActions.communityCreateFailed, (state, payload) => {
      return {
        ...state,
        loading: false,
        error: payload.errorMsg,
      };
    })
  ),
});
