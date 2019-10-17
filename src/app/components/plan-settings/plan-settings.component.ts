import { Component, Input, OnInit } from '@angular/core';
import tags from '../../constants/tags';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.scss']
})
export class PlanSettingsComponent implements OnInit {
  @Input() plan: any;

  tags: any[] = tags;

  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit() {
  }

  updateIsPublic() {
    this.planService.updatePlan(this.plan.id, { isPublic: this.plan.isPublic }).subscribe();
  }

}
