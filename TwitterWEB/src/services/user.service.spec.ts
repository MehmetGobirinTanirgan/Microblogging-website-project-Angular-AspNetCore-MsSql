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

  //Mock data
  const userProfileCard = {
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

  const tweet = {
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

  const UserProfile = {
    userProfileCard: userProfileCard,
    ownTweets: [tweet],
    nonReplyOwnTweets: [tweet],
    likedTweets: [tweet],
    mediaTypeTweets: [tweet],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#signUp should post and return OK', () => {
    const signUpModel = {
      fullname: 'mockFullname',
      emailAddress: 'mock@gmail.com',
      password: '12345',
      year: 2000,
      month: 10,
      day: 15,
      phoneNumber: '',
    };
    service.signUp(signUpModel).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: 'Login/SignUp',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(signUpModel);
    req.flush('');
  });

  it('#getUserProfile should return expected data', () => {
    let userID = 'mockUserID';
    service.getUserProfile(userID).subscribe((res) => {
      expect(res).toBe(UserProfile);
    });

    const req = mockHttp.expectOne({
      url: `Profile/GetUserProfile/${userID}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(UserProfile);
  });

  it('#getForeignUserProfile should return expected data', () => {
    let userID = 'mockUserID';
    let foreignUserID = 'mockForeignUserID';
    service.getForeignUserProfile(userID, foreignUserID).subscribe((res) => {
      expect(res).toBe(UserProfile);
    });

    const req = mockHttp.expectOne({
      url: `Profile/GetForeignUserProfile/${foreignUserID}/${userID}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(UserProfile);
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
