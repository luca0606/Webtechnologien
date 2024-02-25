import { TestBed } from '@angular/core/testing';


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
