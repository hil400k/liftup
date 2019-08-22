import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    private requestsUtil: RequestsUtilService
  ) { }

  createWorkout(params) {
    return this.requestsUtil.postRequest(`workouts`, {
      date: new Date().getTime(),
      isOpen: true,
      ...params
    });
  }

  getWorkouts(params) {
    return this.requestsUtil.getRequest(`workouts?customPlan=${params.planId}`).pipe(
      map((workouts: any) => {
        return workouts.sort(function (a, b) {
          return a.date - b.date;
        });
      })
    );
  }

  updateWorkout(params) {
    return this.requestsUtil.putRequest(`workouts/${params.id}`, params.data);
  }

  removeWorkout(id) {
    return this.requestsUtil.deleteRequest(`workouts/${id}`);
  }

  private getRequestString(user, params) {
    return `/custom-plans/${user.uid}/${params.planName}/workouts`;
  }
}
