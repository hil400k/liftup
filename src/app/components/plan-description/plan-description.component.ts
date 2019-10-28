import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'plan-description',
  templateUrl: './plan-description.component.html',
  styleUrls: ['./plan-description.component.scss']
})
export class PlanDescriptionComponent implements OnInit {
  @Input() plan: any;
  @Input() readOnly: boolean;

  sanitizedDesc: any;

  showFull: boolean = false;
  editingState: boolean = false;

  get isReadOnlyMode() {
    return (!this.plan.isOriginal) || (this.readOnly);
  }

  constructor(
    private planService: PlanService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.sanitizedDesc = this.getSanitized(this.plan.description);
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
      this.sanitizedDesc = this.getSanitized(this.plan.description);
    });
  }

  getSanitized(code) {
    return this._sanitizer.bypassSecurityTrustHtml(code);
  }

}
