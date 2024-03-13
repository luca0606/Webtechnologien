import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StellenpflegeService } from './stellenpflege.service';
import { StellenService } from './stellen.service';
import { of } from 'rxjs';
import { BASE_URL } from '../shared/sharedData';

describe('StellenpflegeService', () => {
  let service: StellenpflegeService;
  let httpTestingController: HttpTestingController;
  let stellenServiceSpy: jasmine.SpyObj<StellenService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StellenService', ['getJobList']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StellenpflegeService,
        { provide: StellenService, useValue: spy }
      ]
    });
    service = TestBed.inject(StellenpflegeService);
    httpTestingController = TestBed.inject(HttpTestingController);
    stellenServiceSpy = TestBed.inject(StellenService) as jasmine.SpyObj<StellenService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJobById should return a job by id', (done: DoneFn) => {
    const mockJobs = [
      { _id: '1', title: 'Developer' },
      { _id: '2', title: 'Designer' }
    ];
    stellenServiceSpy.getJobList.and.returnValue(of(mockJobs));

    service.getJobById('1').subscribe(job => {
      expect(job).toEqual(mockJobs[0]);
      done();
    });
  });

  it('setChanges should make PATCH request to update a job', () => {
    const changedJob = { title: 'Updated Developer' };
    const id = '1';

    service.saveChanges(id, changedJob)

    const req = httpTestingController.expectOne(`${BASE_URL}job/${id}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(changedJob);
    req.flush(changedJob); // Simulate the HTTP response
  });
});
