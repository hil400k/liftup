import { TestBed, inject } from '@angular/core/testing';

import { RequestsUtilService } from './requests-util.service';

describe('RequestsUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsUtilService]
    });
  });

  it('should be created', inject([RequestsUtilService], (service: RequestsUtilService) => {
    expect(service).toBeTruthy();
  }));
});
