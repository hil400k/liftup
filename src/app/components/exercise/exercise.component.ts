import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: any;
  @Input() exerciseIndex: number;

  @Output() onSetDone: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {

  }

  setDoneClicked(exercise) {
    this.onSetDone.emit(exercise);
  }

  removeExerciseClicked(exerciseId) {
    this.onRemoveExercise.emit(exerciseId);
  }
}
