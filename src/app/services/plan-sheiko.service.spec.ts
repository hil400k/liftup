import { TestBed, inject } from '@angular/core/testing';

import { PlanSheikoService } from './plan-sheiko.service';

describe('PlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanSheikoService]
    });
  });

  it('should be created', inject([PlanSheikoService], (service: PlanSheikoService) => {
    expect(service).toBeTruthy();
  }));
});
