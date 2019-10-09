import { Component, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';

@Component({
  selector: 'plan-search',
  templateUrl: './plan-search.component.html',
  styleUrls: ['./plan-search.component.scss']
})
export class PlanSearchComponent implements OnInit {
  isOpen: boolean;
  plans: any[];

  constructor(
    private planSearchService: PlanSearchService
  ) { }

  ngOnInit() {
  }

  search(param) {
    if (param.tag) {
      this.planSearchService.searchByTag(param)
        .subscribe(plans => {
          this.plans = plans;

          console.info(this.plans);
        });
    } else {

    }
  }

  getPlanName(plan) {
    return `${plan.name} @${plan.user.username}`;
  }

}
