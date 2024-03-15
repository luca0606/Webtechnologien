import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BewerbenComponent } from './bewerben.component';
import { BewerbenService } from '../service/bewerben.service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
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
        FormBuilder,
        {
          provide: BewerbenService,
          useValue: {
            addApplication: jasmine.createSpy('addApplication').and.returnValue(of({}))
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewerbenComponent);
    component = fixture.componentInstance;
    bewerbenService = TestBed.inject(BewerbenService);
    component.ngOnInit(); // Ensure the form is initialized here if not done in the constructor
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form inputs before submitting', () => {
    component.bewerbenForm.controls['bewerbung'].setValue('');
    component.bewerbenForm.controls['datei'].setValue('');
    component.bewerbenForm.controls['applicationTitle'].setValue('');
    component.bewerbenForm.controls['filePath'].setValue('');
    expect(component.bewerbenForm.valid).toBeFalsy();

    component.bewerbenForm.controls['bewerbung'].setValue('Test Bewerbung');
    component.bewerbenForm.controls['datei'].setValue(new File([], 'resume.pdf'));
    component.bewerbenForm.controls['applicationTitle'].setValue('Valid Title');
    component.bewerbenForm.controls['filePath'].setValue('path/to/file');
    expect(component.bewerbenForm.valid).toBeTruthy();
  });

  it('should call addApplication on form submission if form is valid', () => {
    const mockApplicationData = {
      bewerbung: 'Test Bewerbung',
      datei: new File([], 'resume.pdf'),
      applicationTitle: 'Valid Title',
      filePath: 'path/to/file'
    };

    component.bewerbenForm.setValue(mockApplicationData);
    component.onSubmit();

    expect(bewerbenService.addApplication).toHaveBeenCalledWith(mockApplicationData);
  });
});
