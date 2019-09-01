import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  press = 0;
  squats = 0;
  deadlift = 0;
  user: any;
  planId: string;

  constructor(
    private planService: PlanService,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.planService.getPlan()
      .subscribe((plan: any) => {
        if (plan) {
          this.planId = plan.id;
          this.press = plan.press;
          this.squats = plan.squats;
          this.deadlift = plan.deadlift;
        }

        this.user = this.auth.currentUserValue;
      });
  }

  update(values) {
    if (this.planId) {
      this.planService.updateScores(values)
        .subscribe();
    } else {
      this.planService.createScores(values)
        .subscribe();
    }
  }

  calculatePress(percentage) {
    return this.press ? (percentage * this.press).toFixed(1) : '';
  }

  calculateSquats(percentage) {
    return this.squats ? (percentage * this.squats).toFixed(1) : '';
  }

  calculateDeadlift(percentage) {
    return this.deadlift ? (percentage * this.deadlift).toFixed(1) : '';
  }

}
