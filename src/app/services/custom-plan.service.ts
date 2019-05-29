import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {
  username;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) {

  }

  createCustomPlan(name) {
    return this.requestsUtil.postRequest('customplans', {
      name,
      creator: this.auth.currentUserValue.id
    });
  }

  removeCustomPlan(plan) {
    return this.requestsUtil.deleteRequest(`customplans/${plan.id}`);
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
    return this.auth.currentUser$.pipe(
      switchMap((resp) => {
        return this.requestsUtil.getRequest(`customplans?creator=${resp.user.id}`);
      })
    );
  }
}
