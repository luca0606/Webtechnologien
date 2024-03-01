import { TestBed } from '@angular/core/testing';

import { StellenService } from './stellen.service';

describe('StellenService', () => {
  let service: StellenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StellenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
