import { TestBed } from '@angular/core/testing';

import { RegistrierungService } from './registrierung.service';

describe('RegistrierungService', () => {
  let service: RegistrierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
