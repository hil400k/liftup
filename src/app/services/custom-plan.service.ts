import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) {

  }

  createCustomPlan(name) {
    return this.getCustomPlan(name).pipe(
      take(1),
      switchMap((plan) => {
        if (!plan.length) {
          return this.auth.user$.pipe(
            switchMap((user) => {
              return this.db.list(`/custom-plans/${user.uid}`).push({name});
            })
          );
        } else {
          return throwError('You already have one plan with such name');
        }
      })
    );
  }

  getCustomPlan(name) {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.db.list(`/custom-plans/${user.uid}`,
            ref => ref.orderByChild('name').equalTo(name)).valueChanges();
      })
    );
  }

  getAllCustomPlans() {
    return this.auth.user$.pipe(
      take(1),
      switchMap((user) => {
        return this.db.list(`/custom-plans/${user.uid}`).valueChanges();
      })
    );
  }
}
