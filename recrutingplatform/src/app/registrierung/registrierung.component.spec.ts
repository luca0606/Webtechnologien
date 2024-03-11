import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrierungComponent } from './registrierung.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrierungService } from '../service/registrierung.service';

describe('RegistrierungComponent', () => {
  let component: RegistrierungComponent;
  let fixture: ComponentFixture<RegistrierungComponent>;
  let registrierungServiceMock: any;
  let routerSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    registrierungServiceMock = jasmine.createSpyObj('RegistrierungService', ['addUser', 'addUserAuthData']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegistrierungComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: RegistrierungService, useValue: registrierungServiceMock },
        { provide: RouterTestingModule, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registration form on ngOnInit', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['vorname']).toBeDefined();
    expect(component.registerForm.controls['email']).toBeDefined();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue("test@test.com");
    expect(email.valid).toBeTruthy();
  });

  // it('should submit form', fakeAsync(() => {
  //   expect(component.registerForm.valid).toBeFalsy();
  //   component.registerForm.controls['vorname'].setValue("John");
  //   component.registerForm.controls['nachname'].setValue("Doe");
  //   component.registerForm.controls['geburtsdatum'].setValue("1990-01-01");
  //   component.registerForm.controls['email'].setValue("test@test.com");
  //   component.registerForm.controls['telefonnummer'].setValue("1234567890");
  //   component.registerForm.controls['strasse'].setValue("Main Street");
  //   component.registerForm.controls['hausnummer'].setValue("123");
  //   component.registerForm.controls['ort'].setValue("City");
  //   component.registerForm.controls['postleitzahl'].setValue("12345");
  //   component.registerForm.controls['passwort'].setValue("password123");
  //   expect(component.registerForm.valid).toBeTruthy();

  //   component.onSubmit();
  //   expect(registrierungServiceMock.addUser).toHaveBeenCalled();
  //   expect(registrierungServiceMock.addUserAuthData).toHaveBeenCalled();
  //   tick();
  //   // expect(routerSpy.navigate).toHaveBeenCalledWith(['/anmeldung']);
  // }));

  it('should toggle role', () => {
    expect(component.isRecruiter).toBeFalse();
    component.toggleRole();
    expect(component.isRecruiter).toBeTrue();
  });

});
