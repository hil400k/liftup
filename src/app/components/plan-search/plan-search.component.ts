import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';

import TAGS from './tags';

@Component({
  selector: 'plan-search',
  templateUrl: './plan-search.component.html',
  styleUrls: ['./plan-search.component.scss']
})
export class PlanSearchComponent implements OnInit, OnDestroy {
  plans: any[];
  showLoader: boolean = false;
  step: number = this.planSearchService.searchStep;
  loadParam: any;
  tags: any[] = TAGS;
  searchType: boolean = true;
  showLoadNext: boolean = false;

  constructor(
    private planSearchService: PlanSearchService,
  ) { }

  ngOnInit(): void {
    // console.info(tags);
  }

  ngOnDestroy(): void {

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
        if (!resp.length) {
          this.showLoadNext = false;
        }
      });
  }

  search(param) {
    this.loadParam = param.tag ? param : (this.searchType ? { tag: param } : param);
    this.showLoader = true;
    if (param.tag || this.searchType) {
      this.planSearchService.searchByTag(this.loadParam)
        .subscribe((plans) => this.searchResponseHandler(plans));
    } else {
      this.planSearchService.searchByName(param)
        .subscribe((plans) => this.searchResponseHandler(plans));
    }
  }

  searchResponseHandler(plans) {
    this.plans = plans;
    this.showLoader = false;
    this.showLoadNext = Boolean((this.plans.length % this.step === 0) && (this.plans.length));
  }

  getPlanName(plan) {
    return `${plan.name} @${plan.user.username}`;
  }
}
