import { Component, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';
import { AuthService } from '../../services/auth.service';

import tags from './tags';

@Component({
  selector: 'plan-search',
  templateUrl: './plan-search.component.html',
  styleUrls: ['./plan-search.component.scss']
})
export class PlanSearchComponent implements OnInit {
  isOpen: boolean;
  plans: any[];
  showLoader: boolean = false;
  currentUserName: string = this.auth.currentUserValue.username;
  step: number = this.planSearchService.searchStep;
  loadParam: any;
  tags: any[] = tags;

  constructor(
    private planSearchService: PlanSearchService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // console.info(tags);
  }

  loadNext() {
    const pLength = this.plans.length;
    const loadMethod = typeof this.loadParam === 'object' ? 'searchByTag' : 'searchByName';
    const stepParams = {
      start: this.plans.length,
      end: this.plans.length + this.step
    };

    this.planSearchService[loadMethod](this.loadParam, stepParams)
      .subscribe(resp => {
        this.plans = this.plans.concat(resp);
      });
  }

  addPlan(plan) {
    const copy: any = (({ name, tags, type, workouts }) => ({ name, tags, type, workouts }))(plan);

    copy.opened = false;
    copy.isOriginal = false;
    copy.user = this.auth.currentUserValue._id;

    this.planSearchService.addPlan(copy).subscribe();
  }

  search(param) {
    this.loadParam = param;
    this.showLoader = true;
    if (param.tag) {
      this.planSearchService.searchByTag(param)
        .subscribe(plans => {
          this.plans = plans;
          this.showLoader = false;
        });
    } else {
      this.planSearchService.searchByName(param)
        .subscribe(plans => {
          this.plans = plans;
          this.showLoader = false;
        });
    }
  }

  showLoadNext() {
    return (this.plans.length % this.step === 0) && (this.plans.length);
  }

  getPlanName(plan) {
    return `${plan.name} @${plan.user.username}`;
  }

}
