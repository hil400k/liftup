import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomPlanService } from '../../services/custom-plan.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-plan',
  templateUrl: './custom-plan.component.html',
  styleUrls: ['./custom-plan.component.scss']
})
export class CustomPlanComponent implements OnInit, OnDestroy {
  error: string;
  plans;
  username;
  customPlanSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private customPlanService: CustomPlanService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.customPlanSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getPlans() {
    this.userSubscription = this.auth.currentUser$.subscribe(resp => {
      this.customPlanSubscription = this.customPlanService.getAllCustomPlans()
        .subscribe(plans => {
          this.plans = plans;
          this.username = this.customPlanService.username;
        });
    });
  }

  clearError() {
    this.error = '';
  }

  createPlan(values) {
    this.customPlanService.createCustomPlan(values)
      .subscribe((resp: any) => {
        this.router.navigate(['custom-plan', resp.customPlan ? resp.customPlan.id : resp.id]);
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
