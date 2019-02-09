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
  buttonCaption = 'Add exercise';
  inputCaption = 'Exercise Name';
  inputValue = '';
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
      this.buttonCaption = 'Create exercise';
      this.inputCaption = 'Type Sets';
      this.exerciseToCreate.name = this.inputValue;
      this.inputValue = '';
    } else {
      this.buttonCaption = 'Add exercise';
      this.inputCaption = 'Exercise Name';
      this.exerciseToCreate.sets = this.inputValue;
      this.inputValue = '';
      this.exerciseService.addExercise({
        ...this.exerciseToCreate,
        workoutName: this.workoutName,
        planName: this.planName
      }).subscribe(() => {
        this.resetExerciseToCreate();
      });
    }
    this.addExerciseState = !this.addExerciseState;
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
