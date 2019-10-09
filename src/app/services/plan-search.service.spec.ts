import { TestBed, inject } from '@angular/core/testing';

import { PlanSearchService } from './plan-search.service';

describe('PlanSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanSearchService]
    });
  });

  it('should be created', inject([PlanSearchService], (service: PlanSearchService) => {
    expect(service).toBeTruthy();
  }));
});
