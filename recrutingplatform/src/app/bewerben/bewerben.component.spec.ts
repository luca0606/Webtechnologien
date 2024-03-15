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

});
