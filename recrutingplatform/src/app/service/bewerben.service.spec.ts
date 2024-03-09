import { TestBed } from '@angular/core/testing';

import { BewerbenService } from './bewerben.service';

describe('BewerbenService', () => {
  let service: BewerbenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BewerbenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
