import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
  ) { }

  createWorkout(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.object(`/custom-plans/${user.uid}/${params.planName}/workouts/${params.workoutName}`)
          .update({
            name: params.workoutName,
            date: new Date().getTime();
          });
      })
    );
  }

  getWorkouts(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.list(`/custom-plans/${user.uid}/${params.planName}/workouts`)
          .valueChanges();
      }),
      map(item => {
        item.map(i => {
          i.isOpen = true;
          return i;
        });

        return item.sort(function (a, b) {
          return a.date - b.date;
        });
      })
    );
  }

  removeWorkout(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.list(`/custom-plans/${user.uid}/${params.planName}/workouts`)
          .remove(params.workoutName);
      })
    );
  }
}
