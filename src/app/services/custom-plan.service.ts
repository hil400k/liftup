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
      creator: this.auth.currentUserValue._id
    };

    if (values.planType) {
      return this.requestsUtil.postRequest('customplans', planParams)
        .pipe(
          switchMap((plan: any) => {
            const workoutParams = {
              name: 'oneExercisePlan-workoutName',
              customPlan: plan.id
            };
            return this.workoutService.createWorkout(workoutParams);
          })
        );
    } else {
      return this.requestsUtil.postRequest('customplans', planParams);
    }
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
