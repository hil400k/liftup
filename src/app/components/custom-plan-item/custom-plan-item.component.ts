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
    const defaultNamedWorkouts = this.workouts.filter(i => i.key.indexOf(defaultName) >= 0);
    const maxVal = defaultNamedWorkouts.map(i => i.key)
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
