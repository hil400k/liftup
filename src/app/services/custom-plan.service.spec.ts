import { TestBed, inject } from '@angular/core/testing';

import { CustomPlanService } from './custom-plan.service';

describe('CustomPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomPlanService]
    });
  });

  it('should be created', inject([CustomPlanService], (service: CustomPlanService) => {
    expect(service).toBeTruthy();
  }));
});
