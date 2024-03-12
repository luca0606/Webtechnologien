import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrierungService } from './registrierung.service';
import * as CryptoJS from 'crypto-js';
import { BASE_URL } from '../shared/sharedData';

describe('RegistrierungService', () => {
  let service: RegistrierungService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrierungService]
    });
    service = TestBed.inject(RegistrierungService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should hash passwords correctly', () => {
    const password = 'test123';
    const hashedPassword = service.hashPassword(password);
    const expectedHash = CryptoJS.SHA256(password).toString();
    expect(hashedPassword).toEqual(expectedHash);
  });

  it('addUser should make a POST request to add a user', () => {
    const mockUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      recruiterRole: false
    };

    service.addUser(mockUser.firstname, mockUser.lastname, mockUser.email, mockUser.recruiterRole);

    const req = httpTestingController.expectOne(`${BASE_URL}user/register`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ message: 'User added' });
  });

  it('addUserAuthData should make a POST request to add user authentication data', () => {
    const email = 'john.doe@example.com';
    const password = 'test123';
    const hashedPassword = service.hashPassword(password);

    service.addUserAuthData(email, password);

    const req = httpTestingController.expectOne(`${BASE_URL}auth/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email: email, password: hashedPassword });
    req.flush({ message: 'AuthData added' });
  });
});
