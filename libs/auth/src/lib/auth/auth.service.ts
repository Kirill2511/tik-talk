import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const isRefreshing$ = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  baseApiUrl = '/yt-course/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/token`, fd)
      .pipe(tap((value) => this.saveTokens(value)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((value) => this.saveTokens(value)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

  refreshTokenAndConnectWs(): Observable<{ access_token: string }> {
    if (isRefreshing$.value) {
      return isRefreshing$.pipe(
        filter((isRefreshing) => !isRefreshing),
        switchMap(() => this.refreshAuthToken())
      );
    }

    isRefreshing$.next(true);
    return this.refreshAuthToken().pipe(
      tap((res) => {
        this.saveTokens(res);
        isRefreshing$.next(false);
      }),
      catchError((error) => {
        isRefreshing$.next(false);
        return throwError(error);
      })
    );
  }
}
