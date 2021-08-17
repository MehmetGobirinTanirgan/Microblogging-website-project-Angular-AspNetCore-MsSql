/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
  let service: AuthenticationService;
  let mockHttp: HttpTestingController;
  let mockData: MockData;
  let mockLocalStorage: MockLocalStorage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    mockHttp = TestBed.inject(HttpTestingController);

    mockData = new MockData();
    mockLocalStorage = new MockLocalStorage();
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#login should post and return expected data', () => {
    let logOutSpy = spyOn(service, 'logOut').and.callThrough();
    let saveDataSpy = spyOn(service, 'saveData').and.callThrough();
    const mockLoggingUser = mockData.mockLoggingUser;
    const mockUserStorageData = mockData.mockUserStorageData;

    service.login(mockLoggingUser).subscribe((res) => {
      expect(res).toBe(mockUserStorageData);
      expect(service.userData).toBe(res);
      expect(saveDataSpy).toHaveBeenCalledTimes(1);
      expect(JSON.parse(localStorage.getItem('user')!)).toEqual(res);
    });

    expect(logOutSpy).toHaveBeenCalledTimes(1);
    const req = mockHttp.expectOne({
      url: 'Login/Authentication',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockLoggingUser);
    req.flush(mockUserStorageData);
  });

  it('#saveData should save user data into localStorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    service.saveData(mockUserStorageData);
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify(mockUserStorageData)
    );
  });

  it('#saveData should override user data', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    localStorage.setItem('user', 'mockUserData');
    service.saveData(mockUserStorageData);
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify(mockUserStorageData)
    );
  });

  it('#getToken should return token when user data is saved into localstorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    service.saveData(mockUserStorageData);
    const token = service.getToken();
    expect(token).toEqual(mockUserStorageData.token);
  });

  it('#getToken should return null when user data is not saved into localstorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const token = service.getToken();
    expect(token).toEqual(null);
  });

  it('#getTUserData should return data when user data is saved into localstorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    service.saveData(mockUserStorageData);
    const userObj = service.getUserData();
    expect(userObj?.id).toEqual(mockUserStorageData.id);
    expect(userObj?.fullname).toEqual(mockUserStorageData.fullname);
    expect(userObj?.username).toEqual(mockUserStorageData.username);
    expect(userObj?.profilePicPath).toEqual(mockUserStorageData.profilePicPath);
    expect(userObj?.token).toEqual(mockUserStorageData.token);
  });

  it('#getUserData should return null when there is none user data in localStorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const userObj = service.getUserData();
    expect(userObj).toEqual(null);
  });

  it('#logOut should remove user from localStorage', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    service.saveData(mockUserStorageData);
    service.logOut();
    expect(service.getUserData()).toEqual(null);
  });

  it('#isLoggedIn should return true when user is logged in with new generated token', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    mockUserStorageData.token = mockData.getNewToken();
    service.saveData(mockUserStorageData);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('#isLoggedIn should return false when user is not logged in ', () => {
    mockLocalStorage.addMockLocalStorage();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('#isLoggedIn should return false when token is expired', () => {
    mockLocalStorage.addMockLocalStorage();
    const mockUserStorageData = mockData.mockUserStorageData;
    mockUserStorageData.token = mockData.getExpiredToken();
    service.saveData(mockUserStorageData);
    expect(service.isLoggedIn()).toBeFalse();
  });
});

class MockData {
  mockUserStorageData = {
    id: '1',
    username: 'mockUsername',
    fullname: 'mockFullname',
    profilePicPath: 'mockURL',
    token: 'mockToken',
  };

  mockLoggingUser = {
    usernameOrPhoneOrEmail: 'mock@gmail.com',
    password: '12345',
  };

  getNewToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  getExpiredToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjB9.JWKPB-5Q8rTYzl-MfhRGpP9WpDpQxC7JkIAGFMDZnpg';
  }
}

class MockLocalStorage {
  store: Record<string, string> = {};

  addMockLocalStorage() {
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (this.store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return this.store[key] || null;
      }
    );

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete this.store[key];
    });
  }
}
