import { Component, OnInit } from '@angular/core';
import { CustomPlanService } from '../../services/custom-plan.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-custom-plan',
  templateUrl: './custom-plan.component.html',
  styleUrls: ['./custom-plan.component.scss']
})
export class CustomPlanComponent implements OnInit {
  error: string;
  plans;
  username;

  constructor(
    private customPlanService: CustomPlanService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.customPlanService.getAllCustomPlans()
      .subscribe(plans => {
        this.plans = plans;
        this.username = this.customPlanService.username;
      });
  }

  clearError() {
    this.error = '';
  }

  createPlan(name) {
    this.customPlanService.createCustomPlan(name)
      .subscribe(data => {
        this.router.navigate(['custom-plan', this.username, name]);
      }, error => {
        this.error = error;
      });
  }

  removePlan(plan) {
    this.customPlanService.removeCustomPlan(plan).subscribe();
  }

}
