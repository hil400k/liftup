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
        return this.db.list(this.getRequestString(user, exercise))
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
        return this.db.list(this.getRequestString(user, exercise))
          .update(exercise.key, { isDone: exercise.isDone });
      })
    );
  }

  getExercises(params) {
    return this.auth.currentUser$.pipe(
      switchMap(user => {
        return this.db.list(this.getRequestString(user, params))
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
        return this.db.list(this.getRequestString(user, params)).remove(params.key);
      })
    );
  }

  parseWeightSets(sets) {
    const parsedSets = [];
    const temp = {
      weight: '',
      reps: ''
    };
    let duplications = 1;

    sets.forEach((item, index) => {
      if (!isOdd(index) || index === 0) {
        const w = { weight: item };

        parsedSets.push(w);

        if (temp.weight !== w.weight) {
          temp.reps = '';
          temp.weight = w.weight;
        }
      } else {
        calculateSetNumber(index, item);
      }
    });

    // непарний
    function isOdd(i) {
      return i % 2;
    }

    // it calculates sets Number (increments sets if they have the same number)
    function calculateSetNumber(index, item) {
      const i = getIndexOfSet(index);
      parsedSets[i].reps = item;

      if (temp.reps === parsedSets[i].reps && temp.weight === parsedSets[i].weight) {
        duplications++;
      } else {
        duplications = 1;
        temp.reps = parsedSets[i].reps;
      }

      parsedSets[i].numb = duplications;
    }

    function getIndexOfSet(index) {
      return Math.ceil(index / 2) - 1;
    }

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

  private  getRequestString(user, exercise) {
    return `/custom-plans/${user.uid}/${exercise.planName}/workouts/${exercise.workoutName}/exercises`;
  }
}
