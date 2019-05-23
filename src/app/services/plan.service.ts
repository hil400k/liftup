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
  plan;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) {

  }

  getPlan() {
    return this.auth.currentUser.pipe(
      switchMap(resp => {
        const planId: string = resp && resp.user.plan;

        if (planId) return this.requestsUtil.getRequest(`plans/${planId}`);
        else return of([{}]);
      }),
      map(plans => this.plan = plans[0])
    );
  }

  updateScores(scores) {
    const planId = this.auth.currentUserValue.user.plan;

    return this.requestsUtil.putRequest(`plans/${planId}`, scores);
  }

  createScores(scores) {
    return this.requestsUtil.postRequest(`plans`, scores);
  }
}
