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
  planName;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.planName = params.get('plan');
      this.workoutService.getWorkouts({ planName: params.get('plan') })
        .subscribe(items => {
          this.workouts = items;
        });
    });
  }

  addWorkout(textInput, val) {
    this.route.paramMap.subscribe(params => {
      this.workoutService.createWorkout({
        workoutName: val || this.nextWorkoutName,
        planName: params.get('plan')
      }).subscribe(() => {
        this.nextWorkoutName = '';
        this.workoutNameEl.nativeElement.blur();
        textInput.reset();
      });
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

  removeWorkout(workoutName) {
    this.route.paramMap.subscribe(params => {
      this.workoutService.removeWorkout({
        planName: params.get('plan'),
        workoutName
      }).subscribe();
    });
  }

  toggleWorkout(item) {
    item.isOpen = !item.isOpen;

    const params = {
      planName: this.planName,
      workoutName: item.name,
      update: {
        isOpen: item.isOpen
      }
    };

    this.workoutService.updateWorkout(params).subscribe();
  }
}
