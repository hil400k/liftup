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
    this.getPlans();
  }

  getPlans() {
    this.auth.currentUser$.subscribe(resp => {
      this.customPlanService.getAllCustomPlans()
        .subscribe(plans => {
          this.plans = plans;
          this.username = this.customPlanService.username;
        });
    });
  }

  clearError() {
    this.error = '';
  }

  createPlan(name) {
    this.customPlanService.createCustomPlan(name)
      .subscribe((plan: any) => {
        this.router.navigate(['custom-plan', plan.id]);
      }, error => {
        this.error = error;
      });
  }

  removePlan(plan) {
    this.customPlanService.removeCustomPlan(plan).subscribe(() => {
      this.getPlans();
    });
  }

}
