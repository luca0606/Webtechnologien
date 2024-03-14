import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StellenService } from './stellen.service';
import { BASE_URL } from '../shared/sharedData';

describe('StellenService', () => {
  let service: StellenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StellenService]
    });
    service = TestBed.inject(StellenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJobList should return expected jobs (HttpClient called once)', () => {
    const expectedJobs = [
      { id: 1, title: 'Developer' },
      { id: 2, title: 'Designer' }
    ];

    service.getJobList().subscribe(jobs => {
      expect(jobs.length).toBe(2);
      expect(jobs).toEqual(expectedJobs);
    });

    const req = httpMock.expectOne(`${BASE_URL}job`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedJobs);
  });

  it('sendJobData should update currentData value', (done: DoneFn) => {
    const newJobData = { id: 3, title: 'Manager' };
    service.currentData.subscribe(data => {
      if (data) {
        expect(data).toEqual(newJobData);
        done();
      }
    });
    service.sendJobData(newJobData);
  });
});
