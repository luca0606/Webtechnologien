import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellenComponent } from './stellen.component';
import { StellenService } from '../service/stellen.service';
import { DataService } from '../service/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('StellenComponent', () => {
  let component: StellenComponent;
  let fixture: ComponentFixture<StellenComponent>;
  let stellenService: StellenService;
  let dataService: DataService;
  const mockMessage = {
    jobTitle: 'Developer',
    jobDescription: 'Job Description',
    jobRequirements: 'Requirements',
    benefits: 'Benefits',
    location: 'Location',
    salaryRangeMin: 50000,
    salaryRangeMax: 70000,
    _id: '123'
  };

  beforeEach(async () => {
    const stellenServiceSpy = jasmine.createSpyObj('StellenService', ['currentData']);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['user$']);

    await TestBed.configureTestingModule({
      declarations: [StellenComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: StellenService, useValue: stellenServiceSpy },
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellenComponent);
    component = fixture.componentInstance;
    stellenService = TestBed.inject(StellenService);
    dataService = TestBed.inject(DataService);

    stellenService.currentData = of(mockMessage);
    dataService.user$ = of({ recruiterRole: false });

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockMessage));
    spyOn(localStorage, 'setItem');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with job details from localStorage', () => {
    expect(component.message).toEqual(mockMessage);
  });

  it('should navigate to apply page when apply is clicked', () => {
    const navigateSpy = spyOn((component as any).r, 'navigate');
    component.apply();
    expect(navigateSpy).toHaveBeenCalledWith(['/'], { state: { id: mockMessage._id } });
  });

  it('should navigate to edit page when editJob is clicked', () => {
    const navigateSpy = spyOn((component as any).r, 'navigate');
    component.editJob();
    expect(navigateSpy).toHaveBeenCalledWith(['/stellenpflege'], { state: { id: mockMessage._id } });
  });

});
