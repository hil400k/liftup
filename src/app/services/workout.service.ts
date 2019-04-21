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
        return this.db.list(this.getRequestString(user, params))
          .update(params.workoutName, {
            name: params.workoutName,
            date: new Date().getTime(),
            isOpen: true
          });
      })
    );
  }

  getWorkouts(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.list(this.getRequestString(user, params))
          .snapshotChanges().pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
          );
      }),
      map((item: any) => {
        return item.sort(function (a, b) {
          return a.date - b.date;
        });
      })
    );
  }

  updateWorkout(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.list(this.getRequestString(user, params))
          .update(params.workoutName, params.update);
      })
    );
  }

  removeWorkout(params) {
    return this.authService.user$.pipe(
      switchMap(user => {
        return this.db.list(this.getRequestString(user, params))
          .remove(params.workoutName);
      })
    );
  }

  private getRequestString(user, params) {
    return `/custom-plans/${user.uid}/${params.planName}/workouts`;
  }
}
