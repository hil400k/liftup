import { Injectable } from '@angular/core';
import { RequestsUtilService } from './requests-util.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanSearchService {
  plans: any[];

  constructor(
    private requestsUtil: RequestsUtilService,
  ) { }

  searchByTag(param) {
    return this.requestsUtil.getRequest(`plans?isPublic=true&tags_contains=${param.tag}`)
      .pipe(
        map(resp => {
          this.plans = resp.map(i => {
            i.opened = false;
            return i;
          });
          return this.plans;
        })
      );
  }
}
