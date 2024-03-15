import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BewerbenComponent } from './bewerben.component';
import { BewerbenService } from '../service/bewerben.service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


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
          useValue: jasmine.createSpyObj('BewerbenService', ['addApplication', 'uploadApplication'])
        }
      ]
    }).compileComponents();
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

  it('should not call addApplication and uploadApplication on form submission if form is invalid', () => {
    component.onSubmit();
    expect(bewerbenService.addApplication).not.toHaveBeenCalled();
    expect(bewerbenService.uploadApplication).not.toHaveBeenCalled();
  });

  // Does not work. Needs to be fixed..

  // it('should call addApplication and uploadApplication on form submission if form is valid', () => {
  //   component.bewerbenForm.controls['applicationTitle'].setValue('Test Title');
  //   component.selectedFile = new File([''], 'test.pdf');
  //   // component.bewerbenForm.controls['filePath'].setValue(component.selectedFile);
  //   component.bewerbenForm.controls['status'].setValue('Bewerbung eingegangen');
  //   component.onSubmit();
  //   expect(bewerbenService.addApplication).toHaveBeenCalled();
  //   expect(bewerbenService.uploadApplication).toHaveBeenCalled();
  // });

});
