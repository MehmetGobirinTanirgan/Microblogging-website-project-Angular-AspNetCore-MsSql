/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('Service: User', () => {
  let service: UserService;
  let mockHttp: HttpTestingController;
  let mockData: MockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockData = new MockData();
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#signUp should post and return OK', () => {
    const mockSignUpModel = mockData.mockSignUpModel;
    service.signUp(mockSignUpModel).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: 'Login/SignUp',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockSignUpModel);
    req.flush('');
  });

  it('#getUserProfile should return expected data', () => {
    const mockUserProfile = mockData.mockUserProfile;
    let userID = 'mockUserID';
    service.getUserProfile(userID).subscribe((res) => {
      expect(res).toBe(mockUserProfile);
    });

    const req = mockHttp.expectOne({
      url: `Profile/GetUserProfile/${userID}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(mockUserProfile);
  });

  it('#getForeignUserProfile should return expected data', () => {
    const mockUserProfile = mockData.mockUserProfile;
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
    let formData = new FormData();
    formData.append('fullname', 'mockFullname');
    formData.append('location', 'mockLocation');
    service.updateProfile(formData).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: 'Profile/UpdateProfile',
    });

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(formData);
    req.flush('');
  });
});

class MockData {
  mockSignUpModel = {
    fullname: 'mockFullname',
    emailAddress: 'mock@gmail.com',
    password: '12345',
    year: 2000,
    month: 10,
    day: 15,
    phoneNumber: '',
  };

  mockUserProfileCard = {
    id: 'mockID',
    createdDate: new Date(),
    fullname: 'mockFullname',
    username: 'mockUsername',
    personalInfo: 'mockPersonalInfo',
    location: 'mockLocation',
    personalWebSiteURL: 'mockPersonalWebSiteURL',
    profilePicPath: 'mockProfilePicPath',
    backgroundPath: 'mockBackgroundPath',
    followerCounter: 1,
    followingCounter: 1,
    followFlag: true,
  };

  mockTweet = {
    id: 'mockID',
    userID: 'mockUserID',
    createdDate: new Date(),
    tweetDetail: 'mockTweetDetail',
    profilePicPath: 'mockProfilePicPath',
    fullname: 'mockFullname',
    username: 'mockUsername',
    replyCounter: 1,
    retweetCounter: 1,
    likeCounter: 1,
    followFlag: true,
    likeFlag: true,
    ownershipStatus: true,
    mainTweetOwnerID: null,
    mainTweetOwnerUsername: null,
    tweetImageInfos: [
      {
        id: '1',
        imagePath: 'mockImagePath',
      },
    ],
  };

  mockUserProfile = {
    userProfileCard: this.mockUserProfileCard,
    ownTweets: [this.mockTweet],
    nonReplyOwnTweets: [this.mockTweet],
    likedTweets: [this.mockTweet],
    mediaTypeTweets: [this.mockTweet],
  };
}
