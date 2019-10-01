import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  plan;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) { }

  createWorkout(params) {
    const planWorkouts = this.plan.workouts;

    planWorkouts.push({
      id: `${this.plan.id}${new Date().getTime()}`,
      date: new Date().getTime(),
      isOpen: true,
      exercises: [],
      ...params
    });

    return this.updateCustomPlanRequest( {
      workouts: planWorkouts
    });
  }

  getWorkouts(params) {
    return this.requestsUtil.getRequest(`someplans/${params.planId}`).pipe(
      map((resp: any) => {
        resp.workouts = resp.workouts.sort(function (a, b) {
          return a.date - b.date;
        });

        this.plan = resp;

        return this.plan;
      })
    );
  }

  updateWorkout(params) {
    const planWorkouts = this.plan.workouts;
    const workoutId = planWorkouts.findIndex(i => i.id === params.workoutId);

    planWorkouts[workoutId] = {
      ...planWorkouts[workoutId],
      ...params.data
    };

    return this.updateCustomPlanRequest( {
      workouts: planWorkouts
    });
  }

  removeWorkout(id) {
    const planWorkouts = this.plan.workouts;
    const workoutId = planWorkouts.findIndex(i => i.id === id);

    planWorkouts.splice(workoutId, 1);

    return this.updateCustomPlanRequest({
      workouts: planWorkouts
    });
  }

  updateCustomPlanRequest(payload) {
    return this.requestsUtil.putRequest(`someplans/${this.plan.id}`, payload);
  }
}
