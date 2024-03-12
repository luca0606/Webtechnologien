import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { of } from 'rxjs';
import { BASE_URL } from '../shared/sharedData';

describe('AuthService', () => {
    let service: AuthService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let routerSpy: jasmine.SpyObj<Router>;
    let dataServiceSpy: jasmine.SpyObj<DataService>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        dataServiceSpy = jasmine.createSpyObj('DataService', ['updateIsLoggedIn', 'updateUser']);

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: Router, useValue: routerSpy },
                { provide: DataService, useValue: dataServiceSpy }
            ]
        });

        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('anmelden should post user credentials, update local storage, and navigate on successful login', (done: DoneFn) => {
        const mockUser = { email: 'test@test.com', name: 'Test User' };
        httpClientSpy.post.and.returnValue(of(mockUser));

        service.anmelden('test@test.com', 'password123');

        expect(httpClientSpy.post).toHaveBeenCalledWith(`${BASE_URL}auth/login/`, jasmine.anything());
        setTimeout(() => {
            expect(localStorage.getItem('loggedIn')).toBe('true');
            expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
            expect(dataServiceSpy.updateIsLoggedIn).toHaveBeenCalledWith(true);
            expect(dataServiceSpy.updateUser).toHaveBeenCalledWith(mockUser);
            expect(routerSpy.navigate).toHaveBeenCalledWith(['stellenportal'], { state: { user: mockUser } });
            done();
        });
    });

    it('abmelden should clear local storage and navigate to anmeldung', () => {
        service.abmelden();

        expect(localStorage.getItem('loggedIn')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
        expect(dataServiceSpy.updateIsLoggedIn).toHaveBeenCalledWith(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['anmeldung']);
    });
});
