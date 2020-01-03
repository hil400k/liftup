import { Component, Input, NgZone, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'plan-description',
  templateUrl: './plan-description.component.html',
  styleUrls: ['./plan-description.component.scss']
})
export class PlanDescriptionComponent implements OnInit {
  @Input() plan: any;
  @Input() readOnly: boolean;

  super: boolean = false;

  modules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ 'list': 'ordered'}]
    ],
    keyboard: {
      bindings: {
        custom: {
          key: 'enter',
          shiftKey: true,
          handler: () => {
            this.edit();
          }
        }
      }
    }
  };
  content: any;
  sanitizedDesc: any;

  showFull: boolean = false;
  editingState: boolean = false;

  get isReadOnlyMode() {
    return (!this.plan.isOriginal) || (this.readOnly);
  }

  constructor(
    private planService: PlanService,
    private _sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {

  }

  changeState(full?: boolean) {
    this.showFull = full;
  }

  changeEditingState() {
    this.editingState = !this.editingState;
  }

  contentChanged(e: any) {
    this.content = e.html;
  }

  edit(newPlanDesc?: any) {
    const desc = newPlanDesc ? newPlanDesc : this.content;

    this.changeEditingState();
    this.planService.updatePlan(this.plan._id, {
      description: desc
    }).subscribe((plan: any) => {
      this.plan.description = plan.description;
      this.ref.detectChanges();
    });
  }
}
