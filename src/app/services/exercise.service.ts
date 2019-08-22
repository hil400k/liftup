import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RequestsUtilService } from './requests-util.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService
  ) { }

  addExercise(exercise) {
    return this.requestsUtil.postRequest(`exercises`, {
      name: exercise.name,
      sets: exercise.sets,
      workout: exercise.workoutId
    });
  }

  updateExercise(exercise) {
    return this.requestsUtil.putRequest(`exercises/${exercise.id}`,
      { isDone: exercise.isDone });
  }

  getExercises(workoutId) {
    return this.requestsUtil.getRequest(`exercises?workout=${workoutId}`);
  }

  removeExercise(id) {
    return this.requestsUtil.deleteRequest(`exercises/${id}`);
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
