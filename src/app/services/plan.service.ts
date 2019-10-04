import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  username;
  plans;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService,
  ) {

  }

  createPlan(values) {
    const workouts = values.planType ? [
      {
        id: `${new Date().getTime()}`,
        date: new Date().getTime(),
        isOpen: true,
        exercises: [],
        name: 'oneExercisePlan-workoutName'
      }
    ] : [];
    const planParams = {
      name: values.planName,
      type: values.planType,
      user: this.auth.currentUserValue._id,
      workouts: workouts
    };

    return this.requestsUtil.postRequest('plans', planParams);
  }

  removePlan(plan) {
    return this.requestsUtil.deleteRequest(`plans/${plan.id}`);
  }

  getPlans() {
    return this.auth.currentUser$.pipe(
      switchMap((resp) => {
        return this.requestsUtil.getRequest(`plans?user=${resp.user._id}`).pipe(
          map(plans => {
            this.plans = plans;

            return this.plans;
          })
        );
      })
    );
  }
}
