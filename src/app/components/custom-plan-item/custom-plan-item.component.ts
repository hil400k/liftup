import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-plan-item',
  templateUrl: './custom-plan-item.component.html',
  styleUrls: ['./custom-plan-item.component.scss']
})
export class CustomPlanItemComponent implements OnInit {
  nextWorkoutName = 'Наступне тренування';
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

  addWorkout() {
    this.route.paramMap.subscribe(params => {
      this.workoutService.createWorkout({
        workoutName: this.nextWorkoutName,
        planName: params.get('plan')
      }).subscribe();
    });
  }

  removeWorkout(workoutName) {
    this.route.paramMap.subscribe(params => {
      this.workoutService.removeWorkout({
        planName: params.get('plan'),
        workoutName
      }).subscribe();
    });
  }
}
