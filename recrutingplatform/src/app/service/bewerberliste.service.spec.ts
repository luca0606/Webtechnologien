import { TestBed } from '@angular/core/testing';

import { BewerberlisteService } from './bewerberliste.service';

describe('BewerberlisteService', () => {
  let service: BewerberlisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BewerberlisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
