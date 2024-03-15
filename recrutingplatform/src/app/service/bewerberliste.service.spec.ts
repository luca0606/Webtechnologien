import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BewerberlisteService } from './bewerberliste.service';
import { BASE_URL } from '../shared/sharedData';

describe('BewerberlisteService', () => {
  let service: BewerberlisteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BewerberlisteService]
    });
    service = TestBed.get(BewerberlisteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Açıkta kalmış HTTP istekleri yoksa test başarılı
  });

  it('should make GET request to retrieve application list', async () => {
    const dummyApplications = [{}, {}];

    service.getApplList().subscribe(applications => {
      expect(applications.length).toBe(2);
      expect(applications).toEqual(dummyApplications);
    });

    const req = httpMock.expectOne(`${BASE_URL}application/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyApplications);
  });

  it('setChanges() should make PATCH request and return updated data', async () => {
    const dummyResponse = { success: true };

    service.setChanges('accepted', '123').then(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}application/123`);
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyResponse);
  });

  it('setMessage() should make PATCH request and return updated data', async () => {
    const dummyResponse = { success: true };

    service.setMessage('Your application is received', '123').then(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}application/123`);
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyResponse);
  });

  it('deleteAppl() should make DELETE request and return confirmation', async () => {
    const dummyResponse = { success: true };

    service.deleteAppl('123').then(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${BASE_URL}application/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

  it('downloadAppl() should handle file download', async () => {
    const dummyBlob = new Blob(['file content'], { type: 'text/plain' });
    const fileName = 'test.txt';

    service.downloadAppl(fileName).then(response => {
      expect(response.size).toBe(dummyBlob.size);
    });

    const req = httpMock.expectOne(`${BASE_URL}job/download/${fileName}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlob);
  });
});
