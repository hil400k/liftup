import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { RequestsUtilService } from './requests-util.service';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})
export class CustomPlanService {
  username;
  plans;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService,
    private workoutService: WorkoutService
  ) {

  }

  createCustomPlan(values) {
    const planParams = {
      name: values.planName,
      type: values.planType,
      user: this.auth.currentUserValue._id,
      workouts: []
    };

    return this.requestsUtil.postRequest('someplans', planParams);
  }

  removeCustomPlan(plan) {
    return this.requestsUtil.deleteRequest(`someplans/${plan.id}`);
  }

  getAllCustomPlans() {
    return this.auth.currentUser$.pipe(
      switchMap((resp) => {
        return this.requestsUtil.getRequest(`someplans?user=${resp.user._id}`).pipe(
          map(plans => {
            this.plans = plans;

            return this.plans;
          })
        );
      })
    );
  }
}
