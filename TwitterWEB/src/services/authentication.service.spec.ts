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

  //Mock data
  const loggingUser = {
    usernameOrPhoneOrEmail: 'mock@gmail.com',
    password: '12345',
  };

  const userStorageData = {
    id: '1',
    username: 'mockUsername',
    fullname: 'mockFullname',
    profilePicPath: 'mockURL',
    token: 'mockToken',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    mockHttp = TestBed.inject(HttpTestingController);

    var store: Record<string, string> = {};

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return store[key] || null;
      }
    );

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
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

    service.login(loggingUser).subscribe((res) => {
      expect(res).toBe(userStorageData);
      expect(service.userData).toBe(res);
      expect(saveDataSpy).toHaveBeenCalledTimes(1);
      expect(JSON.parse(localStorage.getItem('user')!)).toEqual(res);
    });
    expect(logOutSpy).toHaveBeenCalledTimes(1);

    const req = mockHttp.expectOne({
      url: 'Login/Authentication',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(loggingUser);
    req.flush(userStorageData);
  });

  it('#saveData should save user data into localStorage', () => {
    service.saveData(userStorageData);
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify(userStorageData)
    );
  });

  it('#saveData should override user data', () => {
    localStorage.setItem('user', 'mockUserData');
    service.saveData(userStorageData);
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify(userStorageData)
    );
  });

  it('#getToken should return token when user data is saved into localstorage', () => {
    service.saveData(userStorageData);
    const token = service.getToken();
    expect(token).toEqual(userStorageData.token);
  });

  it('#getToken should return null when user data is not saved into localstorage', () => {
    const token = service.getToken();
    expect(token).toEqual(null);
  });

  it('#getTUserData should return data when user data is saved into localstorage', () => {
    service.saveData(userStorageData);
    const userObj = service.getUserData();
    expect(userObj?.id).toEqual(userStorageData.id);
    expect(userObj?.fullname).toEqual(userStorageData.fullname);
    expect(userObj?.username).toEqual(userStorageData.username);
    expect(userObj?.profilePicPath).toEqual(userStorageData.profilePicPath);
    expect(userObj?.token).toEqual(userStorageData.token);
  });

  it('#getUserData should return null when there is none user data in localStorage', () => {
    const userObj = service.getUserData();
    expect(userObj).toEqual(null);
  });

  it('#logOut should remove user from localStorage', () => {
    service.saveData(userStorageData);
    service.logOut();
    expect(service.getUserData()).toEqual(null);
  });

  it('#isLoggedIn should return true when user is logged in with new generated token', () => {
    userStorageData.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    service.saveData(userStorageData);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('#isLoggedIn should return false when user is not logged in ', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('#isLoggedIn should return false when token is expired', () => {
    userStorageData.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjB9.JWKPB-5Q8rTYzl-MfhRGpP9WpDpQxC7JkIAGFMDZnpg';
    service.saveData(userStorageData);
    expect(service.isLoggedIn()).toBeFalse();
  });
});
