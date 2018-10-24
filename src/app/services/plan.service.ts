import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plan;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {

  }

  getPlan() {
    return this.authService.user$.pipe(
      switchMap(user => {
        return user ? this.db.object(`/plans/${user.uid}`).valueChanges() : of({});
      }),
      map(plan => this.plan = plan)
    );
  }

  updateScores(scores) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return user ? this.db.object(`/plans/${user.uid}`).update(scores) : of();
      }),
    );
  }
}
