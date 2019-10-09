import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'parsed-exercise',
  templateUrl: './parsed-exercise.component.html',
  styleUrls: ['./parsed-exercise.component.scss']
})
export class ParsedExerciseComponent implements OnInit {
  @Input() exercise: any;

  constructor() { }

  ngOnInit() {

  }

}
