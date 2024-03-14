import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellenComponent } from './stellen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../service/data.service';
import { StellenService } from '../service/stellen.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('StellenComponent', () => {
  let component: StellenComponent;
  let fixture: ComponentFixture<StellenComponent>;
  let dataServiceMock: any;
  let stellenServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    dataServiceMock = { user$: of({ recruiterRole: false }) };
    stellenServiceMock = { currentData: of({ id: '123', jobTitle: 'Developer' }) };

    await TestBed.configureTestingModule({
      declarations: [StellenComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: StellenService, useValue: stellenServiceMock }
      ],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StellenComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load saved job from localStorage if available', () => {
      const mockJob = { id: '123', jobTitle: 'Developer' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockJob));
      component.ngOnInit();
      expect(component.message).toEqual(mockJob);
    });

    it('should subscribe to currentData if no saved job in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      component.ngOnInit();
      expect(component.message).toEqual({ id: '123', jobTitle: 'Developer' });
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      spyOn(router, 'navigate');
      component.message = { _id: '123', jobTitle: 'Developer' };
    });

    it('should navigate to /bewerben on apply', () => {
      component.apply();

      expect(router.navigate).toHaveBeenCalledWith(['/bewerben'], { state: { id: '123' } });
    });

    it('should navigate to /stellenpflege on editJob', () => {
      component.editJob();

      expect(router.navigate).toHaveBeenCalledWith(['/stellenpflege'], { state: { id: '123', mode: 'edit' } });
    });
  });
});
