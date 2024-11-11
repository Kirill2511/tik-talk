import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Community,
  CommunityCreateDto,
} from '../interfaces/communities.interface';

export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'community filter': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),
    'community loaded': props<{ community: Community[] }>(),
    'community load failed': props<{ errorMsg: string }>(),

    'community create': props<{ create: CommunityCreateDto }>(),
    'community create successfully': emptyProps(),
    'community create failed': props<{ errorMsg: string }>(),
  },
});
