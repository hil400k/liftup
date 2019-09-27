import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-plan-item',
  templateUrl: './custom-plan-item.component.html',
  styleUrls: ['./custom-plan-item.component.scss']
})
export class CustomPlanItemComponent implements OnInit {
  @ViewChild('workoutNameEl') workoutNameEl: ElementRef;
  nextWorkoutName = '';
  workouts;
  planId;
  type: string;
  oneExercisePlanData;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.planId = params.get('planId');
      this.getWorkouts(this.planId);
    });
  }

  getWorkouts(planId) {
    this.workoutService.getWorkouts({ planId })
      .subscribe(items => {
        this.workouts = items;
        this.type = (items[0] && items[0].customPlan.type) || '';

        if (this.type) {
          this.oneExercisePlanData = this.workouts[0];
        }
      });
  }

  addWorkout(textInput, val) {
    this.workoutService.createWorkout({
      name: val || this.nextWorkoutName,
      customPlan: this.planId
    }).subscribe((resp) => {
      this.nextWorkoutName = '';
      this.workoutNameEl.nativeElement.blur();
      textInput.reset();
      this.getWorkouts(this.planId);
    });
  }

  addDefaultWorkout(textInput) {
    const defaultName = 'workout';
    const defaultNamedWorkouts = this.workouts.filter(i => i.name.indexOf(defaultName) >= 0);
    const maxVal = defaultNamedWorkouts.map(i => i.name)
      .reduce((acc, i) => {
        if (Number(acc) < Number(i.split(' ')[1])) {
          acc = Number(i.split(' ')[1]) ;
        }
        return acc;
      }, '');
    this.addWorkout(textInput, `workout ${Number(maxVal) + 1}`);
  }

  removeWorkout(id) {
    this.workoutService.removeWorkout(id).subscribe((resp) => {
      this.getWorkouts(this.planId);
    });
  }

  toggleWorkout(item) {
    item.isOpen = !item.isOpen;

    const params = {
      id: item.id,
      data: {
        isOpen: item.isOpen
      }
    };

    this.workoutService.updateWorkout(params).subscribe();
  }
}
