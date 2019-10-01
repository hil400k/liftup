import { Component, OnInit } from '@angular/core';
import { PlanSheikoService } from '../../services/plan-sheiko.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'plan-sheiko',
  templateUrl: './plan-sheiko.component.html',
  styleUrls: ['./plan-sheiko.component.scss']
})
export class PlanSheikoComponent implements OnInit {
  press = 0;
  squats = 0;
  deadlift = 0;
  user: any;
  planId: string;

  constructor(
    private planSheikoService: PlanSheikoService,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.planSheikoService.getPlan()
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
      this.planSheikoService.updateScores(values)
        .subscribe();
    } else {
      this.planSheikoService.createScores(values)
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
