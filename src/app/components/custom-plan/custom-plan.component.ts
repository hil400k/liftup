import { Component, OnInit } from '@angular/core';
import { CustomPlanService } from '../../services/custom-plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-plan',
  templateUrl: './custom-plan.component.html',
  styleUrls: ['./custom-plan.component.scss']
})
export class CustomPlanComponent implements OnInit {
  error: string;
  plans;

  constructor(
    private customPlanService: CustomPlanService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customPlanService.getAllCustomPlans()
      .subscribe(plans => this.plans = plans);
  }

  clearError() {
    this.error = '';
  }

  createPlan(name) {
    this.customPlanService.createCustomPlan(name)
      .subscribe(data => {
        this.router.navigate(['custom-plan', name]);
      }, error => {
        this.error = error;
      });
  }

  removePlan(plan) {
    this.customPlanService.removeCustomPlan(plan).subscribe();
  }

}
