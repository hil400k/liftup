import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit, OnDestroy {
  error: string;
  plans;
  publicPlans;
  privatePlans;
  username;
  customPlanSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private planService: PlanService,
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
      this.customPlanSubscription = this.planService.getPlans()
        .subscribe(plans => {
          this.plans = plans;
          this.publicPlans = this.plans.filter(p => p.isPublic);
          this.privatePlans = this.plans.filter(p => p.isPublic === false);
          this.username = this.planService.username;
        });
    });
  }

  clearError() {
    this.error = '';
  }

  createPlan(values) {
    this.planService.createPlan(values)
      .subscribe((resp: any) => {
        this.router.navigate(['plans', resp.customPlan ? resp.customPlan.id : resp.id]);
      }, error => {
        this.error = error;
      });
  }

  removePlan(plan) {
    this.planService.removePlan(plan).subscribe(() => {
      this.getPlans();
    });
  }

}
