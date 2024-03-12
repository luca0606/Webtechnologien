import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from 'src/app/service/filter.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let filterServiceMock: jasmine.SpyObj<FilterService>;

  beforeEach(async () => {
    // Mock the FilterService with necessary methods
    filterServiceMock = jasmine.createSpyObj('FilterService', ['getFilters', 'addFilter', 'deleteFilter', 'updateFilter']);

    // Mock response for getFilters()
    filterServiceMock.getFilters.and.returnValue(of([{ title: 'Mock Filter' }]));

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: FilterService, useValue: filterServiceMock }],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements and directives
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate savedFilters from FilterService on initialization', () => {
    expect(filterServiceMock.getFilters).toHaveBeenCalled();
    expect(component.savedFilters.length).toBeGreaterThan(0);
  });

  it('should apply filters correctly', () => {
    component.localJobList = [
      { jobTitle: 'Developer', jobRequirements: 'JavaScript', location: 'Berlin', salaryRangeMax: 60000, salaryRangeMin: 50000 },
      { jobTitle: 'Designer', jobRequirements: 'CSS', location: 'Hamburg', salaryRangeMax: 55000, salaryRangeMin: 45000 }
    ];

    component.filter.title = 'Developer';
    spyOn(component.jobListFiltered, 'emit');
    component.applyFilters();

    expect(component.jobListFiltered.emit).toHaveBeenCalledWith([
      { jobTitle: 'Developer', jobRequirements: 'JavaScript', location: 'Berlin', salaryRangeMax: 60000, salaryRangeMin: 50000 }
    ]);
  });


  it('should reset filters correctly', () => {
    component.filter.title = 'Developer';

    component.localJobList = [
      { location: 'Berlin', jobTitle: 'Developer', jobRequirements: 'JavaScript' },
      { location: 'Hamburg', jobTitle: 'Designer', jobRequirements: 'CSS' }
    ];

    spyOn(component.jobListFiltered, 'emit');
    component.resetFilters();

    expect(component.filter.title).toBe('');
    expect(component.jobListFiltered.emit).toHaveBeenCalledWith(component.localJobList);
  });


  it('should create filter arrays for options', () => {
    component.jobList = [
      { location: 'Berlin', jobTitle: 'Developer', jobRequirements: 'JavaScript' },
      { location: 'Hamburg', jobTitle: 'Designer', jobRequirements: 'CSS' }
    ];
    component.createFilterArrays();
    expect(component.locations).toContain('Berlin');
    expect(component.titles).toContain('Developer');
    expect(component.requirements).toContain('JavaScript');
  });

  it('should create a local job list identical to input job list', () => {
    const mockJobList = [{ title: 'Mock Job' }];
    component.jobList = mockJobList;
    component.createLocalJobList();
    expect(component.localJobList).toEqual(mockJobList);
  });

  it('should save a filter using FilterService', async () => {
    const mockFilter = { title: 'Mock Filter' };
    filterServiceMock.addFilter.and.returnValue(Promise.resolve({ ...mockFilter, _id: '123' }));
    await component.saveFilter(mockFilter);
    expect(filterServiceMock.addFilter).toHaveBeenCalledWith(mockFilter);
    expect(component.savedFilters.length).toBeGreaterThan(0);
  });

  it('should select a filter from saved filters', () => {
    const mockFilter = {
      title: '',
      requirement: '',
      location: '',
      salaryRange: '',
      vacancyActive: '',
      filterSelected: true,
      _id: '123'
    };
    component.savedFilters = [mockFilter];
    component.selectFilter(mockFilter);
    expect(component.filter).toEqual(mockFilter);
    expect(component.savedFilters[0].filterSelected).toBeTrue();
  });

  it('should use a saved filter on the job list', () => {
    const mockFilter = { title: 'Mock Filter', _id: '123' };
    spyOn(component, 'applyFilters');
    component.useSavedFilter(mockFilter);
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should delete a saved filter', () => {
    const mockFilter = { _id: '123' };
    component.savedFilters = [mockFilter];
    component.deleteSavedFilter(mockFilter);
    expect(component.savedFilters.length).toBe(0);
  });

  // Additional sorting function tests
  it('should sort jobs by title', () => {
    spyOn(component.jobListFiltered, 'emit');
    component.sortJobsByTitle();
    expect(component.jobListFiltered.emit).toHaveBeenCalled();
  });

  it('should sort jobs by location', () => {
    spyOn(component.jobListFiltered, 'emit');
    component.sortJobsByLocation();
    expect(component.jobListFiltered.emit).toHaveBeenCalled();
  });

  it('should sort jobs by salary', () => {
    spyOn(component.jobListFiltered, 'emit');
    component.sortJobsBySalary();
    expect(component.jobListFiltered.emit).toHaveBeenCalled();
  });

  it('should sort jobs by requirement', () => {
    spyOn(component.jobListFiltered, 'emit');
    component.sortJobsByRequirement();
    expect(component.jobListFiltered.emit).toHaveBeenCalled();
  });
});
