import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BewerbenService } from './bewerben.service';
import { BASE_URL } from '../shared/sharedData';

describe('BewerbenService', () => {
  let service: BewerbenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BewerbenService]
    });
    service = TestBed.inject(BewerbenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addApplication() should make POST request', () => {
    const dummyApplication = { id: '123', status: 'pending' };
    service.addApplication(dummyApplication);
    const req = httpMock.expectOne(`${BASE_URL}application`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyApplication); // Simulate the server response
  });

  it('uploadApplication() should make POST request for file upload', () => {
    const dummyFormData = new FormData();
    dummyFormData.append('file', new Blob(['test content'], { type: 'text/plain' }), 'test.txt');

    service.uploadApplication(dummyFormData);

    const req = httpMock.expectOne(`${BASE_URL}job/upload`);
    expect(req.request.method).toBe('POST');

    req.flush({ success: true });
  });
});
