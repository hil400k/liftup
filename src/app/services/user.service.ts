import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService
  ) {

  }

  get fbUser() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return of(user);
      })
    );
  }
}
