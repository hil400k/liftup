import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class PlanSheikoService {
  planId: string;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) {

  }

  getPlan() {
    return this.auth.currentUser$.pipe(
      switchMap(userResp => {
        if (userResp && userResp.user._id) {
          console.info(userResp);
          return this.requestsUtil.getRequest(`plansheikos?user=${userResp.user._id}`).pipe(
            map((resp: any) => {
              this.planId = resp && resp[0] && resp[0].id;

              return resp[0];
            }),
            catchError(err => {
              console.info(err);

              return of(err);
            })
          );
        } else {
          return of({});
        }
      })
    );
  }

  updateScores(scores) {
    return this.requestsUtil.putRequest(`plansheikos/${this.planId}`, scores);
  }

  createScores(scores) {
    const creator = this.auth.currentUserValue && this.auth.currentUserValue._id;
    const payload = { ...scores, user: creator };

    if (payload) {
      return this.requestsUtil.postRequest(`plansheikos`, payload).pipe(
        map((plan: any) => {
          this.planId = plan.id;

          return plan;
        })
      );
    } else {
      return of(null);
    }
  }
}
