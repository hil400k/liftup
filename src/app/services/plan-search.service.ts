import { Injectable } from '@angular/core';
import { RequestsUtilService } from './requests-util.service';
import { map } from 'rxjs/operators';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class PlanSearchService {
  plans: any[];
  searchStep: number = 8;

  constructor(
    private requestsUtil: RequestsUtilService,
    private exerciseService: ExerciseService,
  ) { }

  addPlan(data) {
    return this.requestsUtil.postRequest('plans', data);
  }

  searchById(id) {
    const requestStr = `plans/${id}?isPublic=true&isOriginal=true`;

    return this.requestsUtil.getRequest(requestStr).pipe(
      map((resp: any) => {
        resp.workouts.forEach(w => {
          w.exercises = this.exerciseService.parse(w.exercises);
        });
        return resp;
      })
    );
  }

  searchByTag(param, stepParams?) {
    const requestStr = `plans?isPublic=true&tags_contains=${param.tag}&isOriginal=true&${this.getStep(stepParams)}`;

    return this.requestsUtil.getRequest(requestStr)
      .pipe(
        map(resp => this.prepareData(resp))
      );
  }

  searchByName(name, stepParams?) {
    const requestStr = `plans?isPublic=true&name=${name}&isOriginal=true&${this.getStep(stepParams)}`;

    return this.requestsUtil.getRequest(requestStr)
      .pipe(
        map(resp => this.prepareData(resp))
      );
  }

  getStep(stepParams) {
    return `_start=${stepParams ? stepParams.start : 0}&_limit=${stepParams ? stepParams.end : this.searchStep}`;
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
