import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  title = 'liftup';
  squats = 100;
  press = 115;
  deadlift = 75;

  constructor() {

  }

  ngOnInit() {

  }

  P(percentage) {
    return (percentage * this.press).toFixed(2) + ' = ' + percentage;
  }

  S(percentage) {
    return (percentage * this.squats).toFixed(2) + ' = ' + percentage;
  }

  D(percentage) {
    return (percentage * this.deadlift).toFixed(2) + ' = ' + percentage;
  }

}
