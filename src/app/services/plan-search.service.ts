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

  addPlan(data) {
    return this.requestsUtil.postRequest('plans', data);
  }

  searchByTag(param) {
    return this.requestsUtil.getRequest(`plans?isPublic=true&tags_contains=${param.tag}&isOriginal=true`)
      .pipe(
        map(resp => this.prepareData(resp))
      );
  }

  searchByName(name) {
    return this.requestsUtil.getRequest(`plans?isPublic=true&name=${name}&isOriginal=true`)
      .pipe(
        map(resp => this.prepareData(resp))
      );
  }

  prepareData(resp) {
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
  }
}
