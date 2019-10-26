import { Component, Input, OnInit } from '@angular/core';
import { PlanSearchService } from '../../services/plan-search.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'plan-preview',
  templateUrl: './plan-preview.component.html',
  styleUrls: ['./plan-preview.component.scss']
})
export class PlanPreviewComponent implements OnInit {
  @Input() plan: any;

  planId: string;
  isSeparatePage: boolean;
  showSharingSuccess: boolean = false;
  showAddingSuccess: boolean = false;

  currentUserName: string = this.auth.currentUserValue && this.auth.currentUserValue.username;

  constructor(
    private planSearchService: PlanSearchService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.plan) {
      this.isSeparatePage = true;
      this.route.paramMap.subscribe(params => {
        this.planId = params.get('planId');
        this.planSearchService.searchById(this.planId)
          .subscribe(resp => {
            this.plan = resp;
          });
      });
    }
  }

  addPlan(plan) {
    const copy: any = (({ name, tags, type, workouts }) => ({ name, tags, type, workouts }))(plan);

    copy.opened = false;
    copy.isOriginal = false;
    copy.user = this.auth.currentUserValue._id;

    this.planSearchService.addPlan(copy).subscribe(() => {
      this.showAddingSuccess = true;

      setTimeout(() => {
        this.showAddingSuccess = false;
      }, 2000);
    });
  }

  shareLink(payload: string) {
    this.showSharingSuccess = true;

    setTimeout(() => {
      this.showSharingSuccess = false;
    }, 2000);
  }

  getPlanLink(plan) {
    const host = window.location.host;
    return `${host}/plan-search/plan/${plan._id}`;
  }
}
