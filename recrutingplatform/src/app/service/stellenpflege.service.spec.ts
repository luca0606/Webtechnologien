import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StellenpflegeService } from './stellenpflege.service';
import { BASE_URL } from '../shared/sharedData';

describe('StellenpflegeService', () => {
  let service: StellenpflegeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StellenpflegeService]
    });
    service = TestBed.inject(StellenpflegeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('addJob should add job', fakeAsync(() => {
    const newJob = { title: 'New Developer' };
    service.addJob(newJob).then(response => {
      expect(response).toEqual(newJob);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}job`);
    expect(req.request.method).toEqual('POST');
    req.flush(newJob);
    flush();
  }));

  it('saveChanges should update job', fakeAsync(() => {
    const updatedJob = { title: 'Updated Developer' };
    service.saveChanges('1', updatedJob).then(response => {
      expect(response).toEqual(updatedJob);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}job/1`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(updatedJob);
    flush();
  }));

  it('deleteJob should delete job', fakeAsync(() => {
    service.deleteJob('1').then(response => {
      expect(response).toEqual({});
    });

    const req = httpTestingController.expectOne(`${BASE_URL}job/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
    flush();
  }));

});
