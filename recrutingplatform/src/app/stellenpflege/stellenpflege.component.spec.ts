import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellenpflegeComponent } from '../stellenpflege/stellenpflege.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StellenpflegeService } from '../service/stellenpflege.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('StellenpflegeComponent', () => {
  let component: StellenpflegeComponent;
  let fixture: ComponentFixture<StellenpflegeComponent>;
  let stellenpflegeServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    stellenpflegeServiceMock = {
      getJobById: jasmine.createSpy('getJobById').and.returnValue(of({
        _id: '1',
        benefits: 'Nice environment',
        jobDescription: 'Developer position',
        jobRequirements: 'Requirements',
        jobTitle: 'Developer',
        location: 'Berlin',
        salaryRangeMax: 60000,
        salaryRangeMin: 50000,
        vacancyActive: true
      })),
      saveChanges: jasmine.createSpy('saveChanges').and.returnValue(of({})),
      deleteJob: jasmine.createSpy('deleteJob').and.returnValue(of({})),
      addJob: jasmine.createSpy('addJob').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [StellenpflegeComponent],
      providers: [
        FormBuilder,
        { provide: StellenpflegeService, useValue: stellenpflegeServiceMock }
      ],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule, HttpClientTestingModule]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellenpflegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveChanges on pressSave and show success message', async () => {
    component.job = { _id: 'mockId', };
    component.id = 'mockId';
    component.initForm();

    await component.onPressSave();

    expect(stellenpflegeServiceMock.saveChanges).toHaveBeenCalledWith('mockId', jasmine.any(Object));
    expect(component.successfulEdit).toBeTrue();
  });


  it('when mode is edit should call deleteJob on pressDelete, navigate and show success message', async () => {
    component.mode = 'edit';
    component.id = '1';
    await component.onPressDelete();
    expect(stellenpflegeServiceMock.deleteJob).toHaveBeenCalledWith('1');
    expect(component.successfulDeletion).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/stellenportal']);
  });

  it('when mode is add should call addJob', async () => {
    component.mode = 'add';
    await component.onPressAdd();
    expect(stellenpflegeServiceMock.addJob).toHaveBeenCalled();
  });

  it('should initialize the form with job data when mode is edit', () => {
    component.mode = 'edit';
    component.id = '1';
    component.ngOnInit();
    expect(component.jobForm.value).toEqual({
      benefits: 'Nice environment',
      jobDescription: 'Developer position',
      jobRequirements: 'Requirements',
      jobTitle: 'Developer',
      location: 'Berlin',
      salaryRangeMax: 60000,
      salaryRangeMin: 50000,
      vacancyActive: true
    });
  });

  it('should initialize the form with empty values when mode is add', () => {
    component.mode = 'add';
    component.ngOnInit();
    expect(component.jobForm.value).toEqual({
      benefits: '',
      jobDescription: '',
      jobRequirements: '',
      jobTitle: '',
      location: '',
      salaryRangeMax: '',
      salaryRangeMin: '',
      vacancyActive: ''
    });
  });
});
