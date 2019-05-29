import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RequestsUtilService } from './requests-util.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  planId: string;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) {

  }

  getPlan() {
    return this.auth.currentUser$.pipe(
      switchMap(resp => {
        if (resp && resp.user.planId) {
          this.planId = resp.user.planId;
          return this.requestsUtil.getRequest(`plans/${resp.user.planId}`);
        } else {
          return of({});
        }
      })
    );
  }

  updateScores(scores) {
    return this.requestsUtil.putRequest(`plans/${this.planId}`, scores);
  }

  createScores(scores) {
    const userId = this.auth.currentUserValue && this.auth.currentUserValue._id;

    if (userId) {
      return this.requestsUtil.postRequest(`plans`, scores).pipe(
        map((plan: any) => {
          this.requestsUtil.putRequest(`users/${userId}`, { planId: plan.id })
            .subscribe();
          this.planId = plan.id;

          return plan;
        })
      );
    } else {
      return of(null);
    }
  }
}
