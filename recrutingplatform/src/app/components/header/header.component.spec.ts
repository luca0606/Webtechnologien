import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let dataServiceMock: jasmine.SpyObj<DataService>;
  let isLoggedInSubject: BehaviorSubject<boolean>;
  let userSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['abmelden']);
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    userSubject = new BehaviorSubject<any>({ recruiterRole: false });

    dataServiceMock = jasmine.createSpyObj('DataService', [], {
      currentIsLoggedIn: isLoggedInSubject.asObservable(),
      user$: userSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DataService, useValue: dataServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isLoggedIn when data service emits', () => {
    isLoggedInSubject.next(true);
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should update user when data service emits', () => {
    const testUser = { name: 'Test User', recruiterRole: true };
    userSubject.next(testUser);
    fixture.detectChanges();
    expect(component.user).toEqual(testUser);
  });

  it('should call abmelden method of AuthService when abmelden is called', () => {
    component.abmelden();
    expect(authServiceMock.abmelden).toHaveBeenCalled();
  });
});
