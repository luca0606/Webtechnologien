import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilterService } from './filter.service';
import { BASE_URL } from '../shared/sharedData';

describe('FilterService', () => {
  let service: FilterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterService]
    });
    service = TestBed.inject(FilterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFilters should make GET request to retrieve filters', () => {
    const mockFilters = [{ id: 1, name: 'Test Filter' }];

    service.getFilters().subscribe(filters => {
      expect(filters).toEqual(mockFilters);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}filter/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockFilters);
  });

  it('addFilter should make POST request to add a filter', async () => {
    const newFilter = { name: 'New Filter' };
    const addedFilter = { ...newFilter, id: 1 };

    service.addFilter(newFilter).then(response => {
      expect(response).toEqual(addedFilter);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}filter/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newFilter);
    req.flush(addedFilter);
  });

  it('updateFilter should make PATCH request to update a filter', async () => {
    const updatedFilter = { _id: '1', name: 'Updated Filter' };

    service.updateFilter(updatedFilter).then(response => {
      expect(response).toEqual(updatedFilter);
    });

    const req = httpTestingController.expectOne(`${BASE_URL}filter/${updatedFilter._id}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(updatedFilter);
    req.flush(updatedFilter);
  });


  it('deleteFilter should make DELETE request to remove a filter', () => {
    const filterToDelete = { _id: '1' };

    service.deleteFilter(filterToDelete);

    const req = httpTestingController.expectOne(`${BASE_URL}filter/${filterToDelete._id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
