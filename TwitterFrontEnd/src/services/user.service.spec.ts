/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockSignUp } from 'src/testObjects/MockSignUp';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { MockUserProfile } from 'src/testObjects/MockUserProfile';
import { MockUserProfileCard } from 'src/testObjects/MockUserProfileCard';
import { UserService } from './user.service';

describe('Service: User', () => {
  let service: UserService;
  let mockHttp: HttpTestingController;
  let mockUserInfo: MockUserInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockUserInfo = new MockUserInfo();
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#signUp should post and return OK', () => {
    const mockSignUpModel = new MockSignUp();
    service.signUp(mockSignUpModel).subscribe((res) => {
      expect(res).toEqual('');
    });

    const req = mockHttp.expectOne({
      url: 'Login/SignUp',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockSignUpModel);
    req.flush('');
  });

  it('#getMainUserProfile should return expected data', () => {
    const mockUserProfile = new MockUserProfile();
    let username = 'mockUsername';
    service.getMainUserProfile(username).subscribe((res) => {
      expect(res).toBe(mockUserProfile);
    });

    const req = mockHttp.expectOne({
      url: `Profile/GetMainUserProfile/${username}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(mockUserProfile);
  });

  it('#getForeignUserProfile should return expected data', () => {
    const mockUserProfile = new MockUserProfile();
    let userID = 'mockUserID';
    let foreignUserID = 'mockForeignUserID';
    service.getForeignUserProfile(userID, foreignUserID).subscribe((res) => {
      expect(res).toBe(mockUserProfile);
    });

    const req = mockHttp.expectOne({
      url: `Profile/GetForeignUserProfile/${foreignUserID}/${userID}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(mockUserProfile);
  });

  it('#updateProfile should send new data', () => {
    const expectedMockData = new MockUserProfileCard();
    let formData = new FormData();
    formData.append('fullname', 'mockFullname');
    formData.append('location', 'mockLocation');
    service.updateProfile(formData).subscribe((res) => {
      expect(res).toEqual(expectedMockData);
    });

    const req = mockHttp.expectOne({
      url: 'Profile/UpdateProfile',
    });

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(formData);
    req.flush(expectedMockData);
  });
});
