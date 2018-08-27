import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liftup';
  squats = 100;
  press = 115;
  deadlift = 75;

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
