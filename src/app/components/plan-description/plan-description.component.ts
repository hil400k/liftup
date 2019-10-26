import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plan-description',
  templateUrl: './plan-description.component.html',
  styleUrls: ['./plan-description.component.scss']
})
export class PlanDescriptionComponent implements OnInit {
  @Input() plan: any;
  @Input() readOnly: boolean;

  showFull: boolean = false;
  editingState: boolean = false;

  get miniDesc(): string {
    return this.isDescriptionShort ? this.plan.description : this.plan.description.slice(0, 150) + ' ...';
  }

  get isDescriptionShort() {
    return this.plan.description.length < 150;
  }

  get isReadOnlyMode() {
    return (!this.plan.isOriginal) || (this.readOnly);
  }

  constructor(
    private planService: PlanService
  ) { }

  ngOnInit() {

  }

  changeState(full?: boolean) {
    this.showFull = full;
  }

  changeEditingState() {
    this.editingState = !this.editingState;
  }

  edit(newPlanDesc: string) {
    this.changeEditingState();

    this.planService.updatePlan(this.plan._id, {
      description: newPlanDesc
    }).subscribe((plan: any) => {
      this.plan.description = plan.description;
    });
  }

}
