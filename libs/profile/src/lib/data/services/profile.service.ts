import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { map, tap } from 'rxjs';
import { GlobalStoreService, Pageble } from '@tt/shared';
import { SignalsStoreService } from './signal-store';

interface ProfileState {
  profiles: Profile[];
  profilesFilters: Record<string, any>;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends SignalsStoreService<ProfileState> {
  http = inject(HttpClient);
  baseApiUrl = '/yt-course/';
  me = signal<Profile | null>(null);
  #globalStoreService = inject(GlobalStoreService);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.#globalStoreService.me.set(res);
      })
    );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      { params }
    );
  }
}
