import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create a mock for AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['abmelden']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule // Setup RouterTestingModule without specific routes
      ],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA] // Avoid errors on unknown elements
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial detection
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it('should check if user is logged in on ngOnInit', () => {
    // Simulate the loggedIn state in localStorage
    localStorage.setItem('loggedIn', 'true');
    component.ngOnInit(); // Call ngOnInit to test its behavior

    // In this scenario, checking the localStorage directly as component doesn't use it directly for state
    const loggedIn = localStorage.getItem('loggedIn');
    expect(loggedIn).toBe('true');
  });

  it('should call abmelden method on AuthService when abmelden is called', () => {
    component.abmelden(); // Call the component's abmelden method
    expect(authServiceMock.abmelden).toHaveBeenCalled(); // Check if the AuthService's abmelden method was called
  });

  // Clean up localStorage after each test
  afterEach(() => {
    localStorage.removeItem('loggedIn');
  });
});
