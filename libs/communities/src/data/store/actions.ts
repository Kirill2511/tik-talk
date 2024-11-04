import { createActionGroup, props } from '@ngrx/store';
import { Community } from '../interfaces/communities.interface';

export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'community filter': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),
    'community loaded': props<{ community: Community[] }>(),
    'community load failed': props<{ errorMsg: string }>(),
  },
});
