import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StellenService } from './stellen.service';
import { BASE_URL } from '../shared/sharedData';

describe('StellenService', () => {
  let service: StellenService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StellenService]
    });
    service = TestBed.inject(StellenService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getJobList should make GET request to retrieve job list', () => {
    const mockJobs = [{ id: 1, title: 'Test Job' }];

    service.getJobList().subscribe(jobs => {
      expect(jobs).toEqual(mockJobs);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}job/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockJobs);
  });

  it('addJob should make POST request to add a job', () => {
    const newJob = {
      jobTitle: "Developer",
      jobDescription: "Test Description",
      jobRequirements: "Test Requirements",
      location: "Test Location",
      benefits: "Test Benefits",
      salaryRangeMin: 50000,
      salaryRangeMax: 70000,
      vacancyActive: true
    };

    service.addJob(newJob.jobTitle, newJob.jobDescription, newJob.jobRequirements, newJob.location, newJob.benefits, newJob.salaryRangeMin, newJob.salaryRangeMax, newJob.vacancyActive);

    const req = httpTestingController.expectOne(`${BASE_URL}job/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newJob);
    req.flush({ message: 'Job added' });
  });

  it('sendJobData should update jobData BehaviorSubject', () => {
    const mockJobData = { title: 'New Job' };
    service.sendJobData(mockJobData);

    service.currentData.subscribe(data => {
      expect(data).toEqual(mockJobData);
    });
  });
});
