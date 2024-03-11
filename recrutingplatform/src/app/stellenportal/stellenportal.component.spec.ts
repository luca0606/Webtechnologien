import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellenportalComponent } from './stellenportal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../service/data.service';
import { StellenService } from '../service/stellen.service';
import { of } from 'rxjs';

describe('StellenportalComponent', () => {
  let component: StellenportalComponent;
  let fixture: ComponentFixture<StellenportalComponent>;
  let dataServiceMock: any;
  let stellenServiceMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      user$: of({ recruiterRole: false })
    };

    stellenServiceMock = {
      getJobList: jasmine.createSpy('getJobList').and.returnValue(of([{ vacancyActive: true }, { vacancyActive: false }])),
      addJob: jasmine.createSpy('addJob').and.returnValue(of({})),
      sendJobData: jasmine.createSpy('sendJobData')
    };

    await TestBed.configureTestingModule({
      declarations: [StellenportalComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: StellenService, useValue: stellenServiceMock }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellenportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter jobList for Bewerbersicht', () => {
    fixture.whenStable().then(() => {
      expect(component.jobList.length).toBe(1);
      expect(component.jobList[0].vacancyActive).toBeTrue();
    });
  });

  it('should call addJob when createJob is called', () => {
    component.createJob();
    expect(stellenServiceMock.addJob).toHaveBeenCalled();
  });

  it('should set filteredJobList on onJobListFiltered', () => {
    const filteredJobs = [{ vacancyActive: true }];
    component.onJobListFiltered(filteredJobs);
    expect(component.jobList).toEqual(filteredJobs);
  });
});
