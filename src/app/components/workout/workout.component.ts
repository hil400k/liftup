import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @Input() workoutName: string;
  @Input() planName: string;

  exercises;
  addExerciseState = false;
  buttonCaption = 'Додати вправу';
  inputCaption = 'Назва вправи';
  nameValue = '';
  setsValue = '';
  exerciseToCreate = {
    name: '',
    sets: ''
  };

  constructor(
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.exerciseService.getExercises({
      workoutName: this.workoutName,
      planName: this.planName
    }).subscribe(exercises => {
      this.exerciseService.parse(exercises);
      this.exercises = exercises;
    });
  }

  exerciseButtonHandler() {
    if (!this.addExerciseState) {
      this.setExerciseName();
    } else {
      this.addExercise();
    }

    this.addExerciseState = !this.addExerciseState;
  }

  setExerciseName() {
    this.buttonCaption = 'Створити впрву';
    this.inputCaption = 'Введіть повторення';
    this.exerciseToCreate.name = this.nameValue;
    this.nameValue = '';
  }

  addExercise() {
    this.buttonCaption = 'Додати вправу';
    this.inputCaption = 'Назва вправи';
    this.exerciseToCreate.sets = this.setsValue;
    this.setsValue = '';
    this.exerciseService.addExercise({
      ...this.exerciseToCreate,
      workoutName: this.workoutName,
      planName: this.planName
    }).subscribe(() => {
      this.resetExerciseToCreate();
    });
  }

  removeExercise(key) {
    this.exerciseService.removeExercise({
      workoutName: this.workoutName,
      planName: this.planName,
      key
    }).subscribe();
  }

  resetExerciseToCreate() {
    this.exerciseToCreate = {
      name: '',
      sets: ''
    };
  }

}
