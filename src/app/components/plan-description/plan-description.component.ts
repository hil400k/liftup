import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plan-description',
  templateUrl: './plan-description.component.html',
  styleUrls: ['./plan-description.component.scss']
})
export class PlanDescriptionComponent implements OnInit {
  @Input() plan: any;

  showFull: boolean;
  editingState: boolean = false;

  get miniDesc(): string {
    return this.plan.description.slice(0,150) + ' ...';
  }


  constructor(
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.changeState();
  }

  changeState(full?: boolean) {
    this.showFull = full;
  }

  edit(newPlanDesc: string) {
    this.editingState = !this.editingState;

    this.planService.updatePlan(this.plan._id, {
      description: newPlanDesc
    }).subscribe((plan: any) => {
      this.plan.description = plan.description;
    });
  }

}
