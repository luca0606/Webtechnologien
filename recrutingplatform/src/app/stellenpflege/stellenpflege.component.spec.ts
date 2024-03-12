import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellenpflegeComponent } from './stellenpflege.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { StellenpflegeService } from '../service/stellenpflege.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('StellenpflegeComponent', () => {
  let component: StellenpflegeComponent;
  let fixture: ComponentFixture<StellenpflegeComponent>;
  let stellenpflegeService: StellenpflegeService;

  const mockJob = {
    jobTitle: 'Developer',
    jobDescription: 'Job Description',
    jobRequirements: 'Requirements',
    benefits: 'Benefits',
    location: 'Location',
    salaryRangeMax: 100000,
    salaryRangeMin: 80000,
    vacancyActive: true,
    _id: '123'
  };

  beforeEach(async () => {
    const stellenpflegeServiceSpy = jasmine.createSpyObj('StellenpflegeService', ['getJobById', 'setChanges']);

    await TestBed.configureTestingModule({
      declarations: [StellenpflegeComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: StellenpflegeService, useValue: stellenpflegeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StellenpflegeComponent);
    component = fixture.componentInstance;
    stellenpflegeService = TestBed.inject(StellenpflegeService);

    (stellenpflegeService.getJobById as any).and.returnValue(of(mockJob));
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with job details', () => {
    expect(component.editForm.value).toEqual({
      jobTitle: mockJob.jobTitle,
      jobDescription: mockJob.jobDescription,
      jobRequirements: mockJob.jobRequirements,
      benefits: mockJob.benefits,
      location: mockJob.location,
      salaryRangeMax: mockJob.salaryRangeMax,
      salaryRangeMin: mockJob.salaryRangeMin,
      vacancyActive: mockJob.vacancyActive
    });
  });

  it('should call setChanges on saveChanges', async () => {
    component.id = mockJob._id;
    component.editForm.setValue(mockJob);
    await component.saveChanges();
    expect(stellenpflegeService.setChanges).toHaveBeenCalledWith(mockJob._id, mockJob);
  });

});
