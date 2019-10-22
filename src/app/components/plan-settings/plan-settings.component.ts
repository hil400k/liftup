import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.scss']
})
export class PlanSettingsComponent implements OnInit {
  @Input() plan: any;
  editingState: boolean = false;
  updatedTags: string;

  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit() {
    this.updatedTags = this.plan.tags;
  }

  updateIsPublic() {
    this.planService.updatePlan(this.plan.id, { isPublic: this.plan.isPublic }).subscribe();
  }

  edit() {
    this.editingState = !this.editingState;

    if (this.updatedTags !== this.plan.tags) {
      this.updatedTags = this.updatedTags.replace(/\s/g, ' ');
      this.planService.updatePlan(this.plan.id, { tags: this.updatedTags })
        .subscribe(resp => {
          this.plan.tags = (resp as any).tags;
        });
    }
  }
}
