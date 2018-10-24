import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:  Observable<firebase.User>

  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth
  ) {
    this.user$ = fbAuth.authState;
  }

  signup(email: string, password: string) {
    return this.fbAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['plan']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    return this.fbAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
        this.router.navigate(['plan']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.fbAuth
      .auth
      .signOut()
      .then(() => {
        console.info('Succesfully loged out');
      });
  }
}
