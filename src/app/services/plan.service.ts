import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

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
      switchMap(user => this.db.object(`/plans/${user.uid}`).valueChanges()),
      map(plan => this.plan = plan)
    );
  }

  updateScores(scores) {
    return this.authService.user$.pipe(
      switchMap(user => this.db.object(`/plans/${user.uid}`).update(scores)),
    );
  }
}
