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
    authServiceMock = jasmine.createSpyObj('AuthService', ['abmelden']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });


  it('should check if user is logged in on ngOnInit', () => {
    localStorage.setItem('loggedIn', 'true');
    component.ngOnInit();

    const loggedIn = localStorage.getItem('loggedIn');
    expect(loggedIn).toBe('true');
  });

  it('should call abmelden method on AuthService when abmelden is called', () => {
    component.abmelden();
    expect(authServiceMock.abmelden).toHaveBeenCalled();
  });

  afterEach(() => {
    localStorage.removeItem('loggedIn');
  });
});
