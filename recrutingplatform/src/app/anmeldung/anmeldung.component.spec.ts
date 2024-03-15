import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AnmeldungComponent } from './anmeldung.component';

describe('AnmeldungComponent', () => {
  let component: AnmeldungComponent;
  let fixture: ComponentFixture<AnmeldungComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['anmelden']);

    await TestBed.configureTestingModule({
      declarations: [AnmeldungComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AnmeldungComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submitting a form calls authService.anmelden', () => {
    component.loginForm.controls['email'].setValue("test@example.com");
    component.loginForm.controls['password'].setValue("123456");
    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();
    expect(authServiceSpy.anmelden.calls.any()).toBe(true);
  });

  it('should toggle role', () => {
    expect(component.isRecruiter).toBeFalse();
    component.toggleRole();
    expect(component.isRecruiter).toBeTrue();
    component.toggleRole();
    expect(component.isRecruiter).toBeFalse();
  });

  it('should navigate to /registrierung', () => {
    // When button is clicked to navigate to /registrierung
    const button = fixture.nativeElement.querySelector('.registrierungButton');
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/registrierung']);
  });

});
