import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'oep-exercise',
  templateUrl: './oep-exercise.component.html',
  styleUrls: ['./oep-exercise.component.scss']
})
export class OepExerciseComponent implements OnInit {
  @Input() exercise: any;
  @Input() exerciseIndex: number;

  @Output() onSetDone: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveExercise: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }

  setDoneClicked(exercise) {
    this.onSetDone.emit(exercise);
  }

  removeExerciseClicked(exerciseId) {
    this.onRemoveExercise.emit(exerciseId);
  }
}
