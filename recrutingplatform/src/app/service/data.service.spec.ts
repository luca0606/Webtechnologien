import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dataService = TestBed.inject(DataService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });


  it('should emit true when isLoggedIn is set to true', (done) => {
    dataService.updateIsLoggedIn(true);
    dataService.getIsLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });

  it('should emit false when isLoggedIn is set to false', (done) => {
    dataService.updateIsLoggedIn(false);
    dataService.getIsLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });



  it('should save and get user to/from localStorage correctly', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };
    dataService.saveUserToLocalStorage(mockUser);

    const userFromLocalStorage = localStorage.getItem('user');
    expect(userFromLocalStorage).not.toBeNull();
    expect(JSON.parse(userFromLocalStorage!)).toEqual(mockUser);

    const userFromService = dataService.getUserFromLocalStorage();
    expect(userFromService).toEqual(mockUser);
  });

  it('should update and get user data correctly', () => {
    const mockUser = { email: 'test@test.com', name: 'Test User' };

    dataService.updateUser(mockUser);
    dataService.getUser().subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

});
