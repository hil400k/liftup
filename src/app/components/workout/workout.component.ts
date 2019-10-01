import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @Input() workoutId: string;
  @Input() exercises: any[];
  @Input() type: string;
  @Input() exerciseName: string;

  addExerciseState = false;
  inputCaption = '';
  inputValue = '';
  exerciseToCreate = {
    name: '',
    sets: '',
    isDone: false
  };

  constructor(
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    if (this.type === 'oneExercisePlan') {
      this.inputCaption = 'Введіть повторення';
    } else {
      this.inputCaption = 'Назва вправи';
    }
    this.exercises = this.exerciseService.parse(this.exercises);
  }

  exerciseButtonHandler() {
    if (this.type === 'oneExercisePlan') {
      this.addExercise();
    } else {
      if (!this.addExerciseState) {
        this.setExerciseName();
      } else {
        this.addExercise();
      }

      this.addExerciseState = !this.addExerciseState;
    }
  }

  setExerciseName() {
    this.inputCaption = 'Введіть повторення';
    this.exerciseToCreate.name = this.inputValue;
    this.inputValue = '';
  }

  addExercise() {
    if (!this.type) this.inputCaption = 'Назва вправи';
    this.exerciseToCreate.sets = this.inputValue;
    this.inputValue = '';

    this.exerciseService.addExercise({
      ...this.exerciseToCreate
    }, this.workoutId).subscribe((exercises) => {
      this.resetExerciseToCreate();
      this.exercises = this.exerciseService.parse(exercises);
    });
  }

  removeExercise(id) {
    this.exerciseService.removeExercise(id, this.workoutId).subscribe((exercises) => {
      this.exercises = this.exerciseService.parse(exercises);
    });
  }

  resetExerciseToCreate() {
    this.exerciseToCreate = {
      name: '',
      sets: '',
      isDone: false
    };
  }

  setDone(exercise) {
    this.exerciseService.updateExercise(exercise, this.workoutId).subscribe();
  }
}
