/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockLocalStorage } from 'src/testObjects/MockLocalStorage';
import { MockLogin } from 'src/testObjects/MockLogin';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
  let service: AuthenticationService;
  let mockHttp: HttpTestingController;
  let mockUserInfo: MockUserInfo;
  let mockLocalStorage: MockLocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockUserInfo = new MockUserInfo();
    mockLocalStorage = new MockLocalStorage();
    mockLocalStorage.addMockLocalStorage();
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Tests', () => {
    beforeEach(() => {});

    it('#login should post and return expected data', () => {
      let logOutSpy = spyOn(service, 'logOut').and.callThrough();
      let saveDataSpy = spyOn(service, 'saveUserInfos').and.callThrough();
      const mockLoggingUser = new MockLogin();
      service.login(mockLoggingUser).subscribe((res) => {
        expect(res).toEqual(mockUserInfo);
        expect(saveDataSpy).toHaveBeenCalledTimes(1);
        expect(JSON.parse(localStorage.getItem('userInfo')!)).toEqual(Object.assign({}, res));
      });

      const req = mockHttp.expectOne({
        url: 'Login/Authentication',
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockLoggingUser);
      req.flush(mockUserInfo);
    });
  });

  describe('LocalStorage Tests', () => {
    beforeEach(() => {});

    it('#saveUserInfos should save user info into localStorage', () => {
      service.saveUserInfos(mockUserInfo);
      expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(mockUserInfo));
    });

    it('#saveUserInfos should override user info', () => {
      localStorage.setItem('userInfo', 'mockUserInfo');
      service.saveUserInfos(mockUserInfo);
      expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(mockUserInfo));
    });

    it('#getAuthenticatedUserInfos should return data when user info is saved into localstorage', () => {
      service.saveUserInfos(mockUserInfo);
      const userInfos = service.getAuthenticatedUserInfos();
      expect(userInfos?.fullname).toEqual(mockUserInfo.fullname);
      expect(userInfos?.username).toEqual(mockUserInfo.username);
      expect(userInfos?.profilePicPath).toEqual(mockUserInfo.profilePicPath);
      expect(userInfos?.token).toEqual(mockUserInfo.token);
    });

    it('#getAuthenticatedUserInfos should return null when there is none user info in localStorage', () => {
      const userObj = service.getAuthenticatedUserInfos();
      expect(userObj).toEqual(null);
    });

    it('#logOut should remove user from localStorage', () => {
      service.saveUserInfos(mockUserInfo);
      service.logOut();
      expect(service.getAuthenticatedUserInfos()).toEqual(null);
    });

    it('#isLoggedIn should return true when user is logged in with new generated token', () => {
      mockUserInfo.token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      service.saveUserInfos(mockUserInfo);
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('#isLoggedIn should return false when user is not logged in ', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('#isLoggedIn should return false when token is expired', () => {
      mockUserInfo.token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjB9.JWKPB-5Q8rTYzl-MfhRGpP9WpDpQxC7JkIAGFMDZnpg';
      service.saveUserInfos(mockUserInfo);
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
