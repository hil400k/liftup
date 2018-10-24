import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  press;
  squats;
  deadlift;

  constructor(
    private planService: PlanService,
  ) {

  }

  ngOnInit() {
    this.planService.getPlan()
      .subscribe((plan: any) => {
        this.press = plan.press;
        this.squats = plan.squats;
        this.deadlift = plan.deadlift;
      });
  }

  update(values) {
    this.planService.updateScores(values)
      .subscribe();
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
