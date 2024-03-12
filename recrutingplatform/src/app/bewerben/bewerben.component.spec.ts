import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BewerbenComponent } from './bewerben.component';
import { BewerbenService } from '../service/bewerben.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('BewerbenComponent', () => {
  let component: BewerbenComponent;
  let fixture: ComponentFixture<BewerbenComponent>;
  let bewerbenService: BewerbenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BewerbenComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: BewerbenService,
          useValue: {
            addApplication: jasmine.createSpy('addApplication').and.returnValue(of({}))
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewerbenComponent);
    component = fixture.componentInstance;
    bewerbenService = TestBed.inject(BewerbenService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form inputs before submitting', () => {
    component.bewerbenForm.controls['bewerbung'].setValue('');
    component.bewerbenForm.controls['datei'].setValue('');
    expect(component.bewerbenForm.valid).toBeFalsy();

    component.bewerbenForm.controls['bewerbung'].setValue('Test Bewerbung');
    component.bewerbenForm.controls['datei'].setValue(new File([], 'resume.pdf'));
    expect(component.bewerbenForm.valid).toBeTruthy();
  });

  it('should call addApplication on form submission if form is valid', () => {
    component.bewerbenForm.controls['bewerbung'].setValue('Test Bewerbung');
    component.bewerbenForm.controls['datei'].setValue(new File([], 'resume.pdf'));
    component.onSubmit();

    expect(bewerbenService.addApplication).toHaveBeenCalledWith(
      component.bewerbenForm.value.bewerbung,
      component.bewerbenForm.value.datei
    );
  });
});
