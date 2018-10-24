import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:  Observable<firebase.User>

  constructor(
    private fbAuth: AngularFireAuth
  ) {
    this.user$ = fbAuth.authState;
  }

  signup(email: string, password: string) {
    this.fbAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.fbAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
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
