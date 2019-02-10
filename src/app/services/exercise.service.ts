import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
  ) { }

  addExercise(exercise) {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.db.list(`/custom-plans/${user.uid}/${exercise.planName}/workouts/${exercise.workoutName}/exercises`)
          .push({
            name: exercise.name,
            sets: exercise.sets,
          });
      })
    );
  }

  getExercises(params) {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.db.list(`/custom-plans/${user.uid}/${params.planName}/workouts/${params.workoutName}/exercises`)
          .snapshotChanges().pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
          );
      })
    );
  }

  removeExercise(params) {
    return this.auth.user$.pipe(
      switchMap(user => {
        const path = `/custom-plans/${user.uid}/${params.planName}/workouts/${params.workoutName}/exercises`;
        return this.db.list(path).remove(params.key);
      })
    );
  }

  parseWeightSets(sets) {
    const parsedSets = [];
    sets.forEach((item, index) => {
      if (!(index % 2) || index === 0) {
        parsedSets.push({ weight: item });
      } else {
        const i = Math.ceil(index / 2) - 1;
        parsedSets[i].iterations = item;
      }
    });
    return parsedSets;
  }

  parse(exercises) {
    return exercises.map(item => {
      const weightSets = item.sets.split('-');
      const sets = item.sets.split('/');
      if (weightSets.length > 1) {
        item.parseType = 'WEIGHT_SETS';
        item.parsedSets = this.parseWeightSets(weightSets);
      } else if (sets.length) {
        item.parseType = 'SETS';
        item.parsedSets = sets;
      }

      return item;
    });
  }
}
