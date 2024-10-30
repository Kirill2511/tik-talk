import { Routes } from '@angular/router';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FormsGroupComponent } from '@tt/experimental';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'forms', component: FormsGroupComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
