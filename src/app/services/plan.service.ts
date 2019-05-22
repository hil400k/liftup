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
        const params = new HttpParams();

        params.append('id', planId);
        return this.requestsUtil.getRequest('plans', { params });
      }),
      map(plans => this.plan = plans[0])
    );
  }

  updateScores(scores) {
    return this.auth.user$.pipe(
      switchMap(user => {
        return user ? this.db.object(`/plans/${user.uid}`).update(scores) : of();
      }),
    );
  }
}
