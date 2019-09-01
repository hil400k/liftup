import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {
  username;
  plans;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) {

  }

  createCustomPlan(name) {
    return this.requestsUtil.postRequest('customplans', {
      name,
      creator: this.auth.currentUserValue._id
    });
  }

  removeCustomPlan(plan) {
    return this.requestsUtil.deleteRequest(`customplans/${plan.id}`);
  }

  getCustomPlan(name) {
    // return this.auth.user$.pipe(
    //   switchMap((user) => {
    //     return this.db.list(`/custom-plans/${user.uid}`,
    //         ref => ref.orderByChild('name').equalTo(name)).valueChanges();
    //   })
    // );
  }

  getAllCustomPlans() {
    return this.auth.currentUser$.pipe(
      switchMap((resp) => {
        return this.requestsUtil.getRequest(`customplans?creator=${resp.user._id}`).pipe(
          map(plans => {
            this.plans = plans;

            return plans;
          })
        );
      })
    );
  }
}
