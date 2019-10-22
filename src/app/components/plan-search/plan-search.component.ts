import { Component, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private planSearchService: PlanSearchService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // console.info(tags);
  }

  addPlan(plan) {
    console.info(plan);
    const copy: any = (({ name, tags, type, workouts }) => ({ name, tags, type, workouts }))(plan);

    copy.opened = false;
    copy.isOriginal = false;
    copy.user = this.auth.currentUserValue._id;

    this.planSearchService.addPlan(copy).subscribe();
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
