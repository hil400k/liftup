import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:  Observable<firebase.User>;
  apiUrl: string;
  currentUserSubject: BehaviorSubject<any>;
  currentUser: Observable<any>;

  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.user$ = fbAuth.authState;
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.apiUrl = `${environment.apiUrl}/auth/local`;
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
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

  signupFB(email: string, password: string) {
    return this.fbAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['plan']);
      });
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

  loginFB(email: string, password: string) {
    return this.fbAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
        this.router.navigate(['plan']);
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  logoutFB() {
    this.fbAuth
      .auth
      .signOut()
      .then(() => {
        console.info('Succesfully loged out');
      });
  }
}
