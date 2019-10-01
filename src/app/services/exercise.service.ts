import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RequestsUtilService } from './requests-util.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: any;

  constructor(
    private auth: AuthService,
    private requestsUtil: RequestsUtilService,
    private workoutService: WorkoutService
  ) { }

  addExercise(exercise) {
    const planWorkouts = this.workoutService.plan.workouts;

    const workoutIndex = planWorkouts.findIndex(i => i.id === exercise.workoutId);
    const exercises = planWorkouts[workoutIndex].exercises;

    exercises.push({
      id: `${workoutIndex}${new Date().getTime()}`,
      name: exercise.name,
      sets: exercise.sets,
    });

    return this.updateCustomPlanRequest( {
      workouts: planWorkouts
    }, exercises);
  }

  updateExercise(exercise, workoutId) {
    const planWorkouts = this.workoutService.plan.workouts;
    const workoutIndex = planWorkouts.findIndex(i => i.id === workoutId);
    const exercises = planWorkouts[workoutIndex].exercises;
    const exerciseId = exercises.findIndex(i => i.id === exercise.id);

    exercises[exerciseId] = {
      ...exercises[exerciseId],
      isDone: exercise.isDone
    };

    return this.updateCustomPlanRequest( {
      workouts: planWorkouts
    }, exercises);
  }

  removeExercise(exId, workoutId) {
    const planWorkouts = this.workoutService.plan.workouts;
    const workoutIndex = planWorkouts.findIndex(i => i.id === workoutId);
    const exercises = planWorkouts[workoutIndex].exercises;
    const exerciseId = exercises.findIndex(i => i.id === exId);

    exercises.splice(exerciseId, 1);

    return this.updateCustomPlanRequest( {
      workouts: planWorkouts
    }, exercises);
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

  updateCustomPlanRequest(payload, exercises) {
    return this.requestsUtil.putRequest(`someplans/${this.workoutService.plan.id}`, payload)
      .pipe(switchMap(() => {
        this.exercises = exercises;
        return of(this.exercises);
      }));
  }
}
