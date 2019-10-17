import { Component, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';
import tags from '../../constants/tags';

@Component({
  selector: 'plan-search',
  templateUrl: './plan-search.component.html',
  styleUrls: ['./plan-search.component.scss']
})
export class PlanSearchComponent implements OnInit {
  isOpen: boolean;
  plans: any[];
  tags: any = tags;
  showLoader: boolean = false;

  constructor(
    private planSearchService: PlanSearchService,
  ) { }

  ngOnInit(): void {
    // console.info(tags);
  }

  search(param) {
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

  getPlanName(plan) {
    return `${plan.name} @${plan.user.username}`;
  }

}
