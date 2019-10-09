import { Injectable } from '@angular/core';
import { RequestsUtilService } from './requests-util.service';
import { map } from 'rxjs/operators';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class PlanSearchService {
  plans: any[];

  constructor(
    private requestsUtil: RequestsUtilService,
    private exerciseService: ExerciseService,
  ) { }

  searchByTag(param) {
    return this.requestsUtil.getRequest(`plans?isPublic=true&tags_contains=${param.tag}`)
      .pipe(
        map(resp => {
          this.plans = resp.map(i => {
            i.opened = false;
            return i;
          });

          this.plans.forEach(p => {
            p.workouts.forEach(w => {
              w.exercises = this.exerciseService.parse(w.exercises);
            });
          });
          return this.plans;
        })
      );
  }
}
