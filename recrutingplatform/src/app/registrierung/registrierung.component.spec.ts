import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RegistrierungComponent } from './registrierung.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrierungService } from '../service/registrierung.service';
import { AnmeldungComponent } from '../anmeldung/anmeldung.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('RegistrierungComponent', () => {
  let component: RegistrierungComponent;
  let fixture: ComponentFixture<RegistrierungComponent>;
  let registrierungServiceMock: any;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    registrierungServiceMock = jasmine.createSpyObj('RegistrierungService', ['addUser', 'addUserAuthData']);

    await TestBed.configureTestingModule({
      declarations: [RegistrierungComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'anmeldung', component: AnmeldungComponent }
        ])
      ],
      providers: [
        { provide: RegistrierungService, useValue: registrierungServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrierungComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture.detectChanges();
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

  it('should submit form', fakeAsync(() => {

    component.registerForm.controls['vorname'].setValue("John");
    component.registerForm.controls['nachname'].setValue("Doe");
    component.registerForm.controls['geburtsdatum'].setValue("1990-01-01");
    component.registerForm.controls['email'].setValue("test@test.com");
    component.registerForm.controls['telefonnummer'].setValue("1234567890");
    component.registerForm.controls['strasse'].setValue("Main Street");
    component.registerForm.controls['hausnummer'].setValue("123");
    component.registerForm.controls['ort'].setValue("City");
    component.registerForm.controls['postleitzahl'].setValue("12345");
    component.registerForm.controls['passwort'].setValue("password123");

    component.onSubmit();
    expect(registrierungServiceMock.addUser).toHaveBeenCalled();
    expect(registrierungServiceMock.addUserAuthData).toHaveBeenCalled();
    tick();
    flush();
    expect(location.path()).toBe('');
  }));

  it('should check the form validity', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['vorname'].setValue("John");
    component.registerForm.controls['nachname'].setValue("Doe");
    component.registerForm.controls['geburtsdatum'].setValue("1990-01-01");
    component.registerForm.controls['email'].setValue("test@test.com");
    component.registerForm.controls['telefonnummer'].setValue("1234567890");
    component.registerForm.controls['strasse'].setValue("Main Street");
    component.registerForm.controls['hausnummer'].setValue("123");
    component.registerForm.controls['ort'].setValue("City");
    component.registerForm.controls['postleitzahl'].setValue("12345");
    component.registerForm.controls['passwort'].setValue("password123");
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should toggle role', () => {
    expect(component.isRecruiter).toBeFalse();
    component.toggleRole();
    expect(component.isRecruiter).toBeTrue();
  });

  it('should not submit form if invalid', () => {
    component.onSubmit();
    expect(registrierungServiceMock.addUser).not.toHaveBeenCalled();
    expect(registrierungServiceMock.addUserAuthData).not.toHaveBeenCalled();
  });

});
