import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageble } from '@tt/shared';
import { Community } from '../interfaces/communities.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  private http = inject(HttpClient);
  private baseApiUrl = '/yt-course/';
  #communityApiUrl = `${this.baseApiUrl}community/`;

  filterCommunity(params: Record<string, any>) {
    return this.http.get<Pageble<Community>>(`${this.#communityApiUrl}`, {
      params,
    });
  }
}
