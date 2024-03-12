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

  it('should send an application', () => {
    const dummyApplication = {
      bewerbung: 'Meine Bewerbung',
      datei: new File([""], "resume.pdf", { type: "application/pdf" })
    };

    service.addApplication(dummyApplication.bewerbung, dummyApplication.datei);

    const req = httpMock.expectOne(`${BASE_URL}user/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyApplication);

    req.flush({ message: 'Application added successfully' });
  });

});
