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

  updateExercise(exercise) {
    return this.auth.user$.pipe(
      map(user => {
        return this.db.list(`/custom-plans/${user.uid}/${exercise.planName}/workouts/${exercise.workoutName}/exercises`)
          .update(exercise.key, { isDone: exercise.isDone });
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
    const temp = {
      weight: '',
      iterations: ''
    };
    let duplications = 1;

    sets.forEach((item, index) => {
      if (!(index % 2) || index === 0) {
        const w = { weight: item };

        parsedSets.push(w);

        if (temp.weight !== w.weight) {
          temp.iterations = '';
          temp.weight = w.weight;
        }
      } else {
        const i = Math.ceil(index / 2) - 1;
        parsedSets[i].iterations = item;

        if (temp.iterations === parsedSets[i].iterations && temp.weight === parsedSets[i].weight) {
          duplications++;
        } else {
          duplications = 1;
          temp.iterations = parsedSets[i].iterations;
        }

        parsedSets[i].numb = duplications;
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
