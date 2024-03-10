import { TestBed } from '@angular/core/testing';

import { StellenpflegeService } from './stellenpflege.service';

describe('StellenpflegeService', () => {
  let service: StellenpflegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StellenpflegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
