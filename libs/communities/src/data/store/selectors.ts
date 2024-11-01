import { createSelector } from '@ngrx/store';
import { communityFeature } from './reducer';

export const selectFilteredCommunity = createSelector(
  communityFeature.selectCommunity,
  (community) => community
);

export const selectCommunityPageable = createSelector(
  communityFeature.selectCommunityFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);

export const selectCommunityFilters = createSelector(
  communityFeature.selectCommunityFilters,
  (filters) => filters
);
