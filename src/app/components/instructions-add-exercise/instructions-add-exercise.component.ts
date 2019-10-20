import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'instructions-add-exercise',
  templateUrl: './instructions-add-exercise.component.html',
  styleUrls: ['./instructions-add-exercise.component.scss']
})
export class InstructionsAddExerciseComponent implements OnInit {
  @Input() location: string;
  showHint: boolean = false;
  isOEP: boolean;
  isDefaultP: boolean;

  constructor() { }

  ngOnInit() {
    this.isDefaultP = !this.location;
    this.isOEP = this.location === 'oepExercise';
  }

  changeShowHint() {
    this.showHint = !this.showHint;
  }

}
