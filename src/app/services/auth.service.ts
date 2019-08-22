import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;
  currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.apiUrl = `${environment.apiUrl}/auth/local`;
  }

  public get currentUserDBValue() {
    return this.currentUserSubject.value;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value && this.currentUserSubject.value.user;
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      username: email.split('@')[0],
      email,
      password
    }).pipe(
      map((resp: any) => {
        if (resp && resp.jwt) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp));
          this.currentUserSubject.next(resp);
          this.router.navigate(['plan']);
        }
        return resp;
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl, {
      identifier: email,
      password
    }).pipe(
      map((resp: any) => {
        if (resp && resp.jwt) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp));
          this.currentUserSubject.next(resp);
          this.router.navigate(['plan']);
        }
        return resp;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
