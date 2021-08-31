import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let activatedRoute: ActivatedRoute;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', [
      'getUserProfile',
      'getForeignUserProfile',
    ]);
    const mockActivatedRoute = {
      params: of({ id: 'mockID' }),
    };
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
      .overrideProvider(UserService, { useValue: userServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockUserService = TestBed.inject(
      UserService
    ) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should change #userID value if auth. service gets data correctly and call #getUserProfile according to activatedRoute', () => {
    const mockData = new MockData();
    const mockUserProfile = mockData.mockUserProfile;
    const mockUserData = mockData.mockUserData;
    const activatedRouteSpy = spyOn(activatedRoute.params, 'subscribe');
    activatedRouteSpy.and.callThrough();
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockUserService.getUserProfile.and.returnValue(of(mockUserProfile));
    fixture.detectChanges();

    expect(component.userID).toEqual(mockUserData.id);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
    expect(mockUserService.getUserProfile).toHaveBeenCalled();
    expect(activatedRouteSpy).toHaveBeenCalled();
  });

  it('#ngOnInit should change #userID value if auth. service gets data correctly and call #getForeignUserProfile according to activatedRoute', () => {
    const mockData = new MockData();
    const mockUserProfile = mockData.mockUserProfile;
    const mockUserData = mockData.mockUserDataForCallingGetForeignUserProfile;
    const activatedRouteSpy = spyOn(activatedRoute.params, 'subscribe');
    activatedRouteSpy.and.callThrough();
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockUserService.getForeignUserProfile.and.returnValue(of(mockUserProfile));
    fixture.detectChanges();

    expect(component.userID).toEqual(mockUserData.id);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalled();
    expect(activatedRouteSpy).toHaveBeenCalledTimes(1);
  });

  it('#ngOnInit should should display alert if #userID is undefined', () => {
    spyOn(window,'alert');
    fixture.detectChanges();

    expect(component.userID).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });

  it('#ngOnInit should should display alert if #foreignUserID is undefined', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    const activatedRouteSpy = spyOn(activatedRoute.params, 'subscribe');
    activatedRouteSpy.and.returnValue(of().subscribe());
    fixture.detectChanges();

    expect(component.upcomingUserID).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Routing URL error');
  });

  it('#getUserProfile should change the parameters of profile if request is successfull', () => {
    const mockData = new MockData();
    const mockUserProfile = mockData.mockUserProfile;
    mockUserService.getUserProfile.and.returnValue(of(mockUserProfile));
    component.getUserProfile('mockID');

    expect(component.userProfileCard).toEqual(mockUserProfile.userProfileCard);
    expect(component.ownTweets).toEqual(mockUserProfile.ownTweets);
    expect(component.nonReplyOwnTweets).toEqual(
      mockUserProfile.nonReplyOwnTweets
    );
    expect(component.mediaTypeTweets).toEqual(mockUserProfile.mediaTypeTweets);
    expect(component.likedTweets).toEqual(mockUserProfile.likedTweets);
    expect(mockUserService.getUserProfile).toHaveBeenCalled();
  });

  it('#getUserProfile display alert if request fails', () => {
    spyOn(window, 'alert');
    mockUserService.getUserProfile.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.getUserProfile('mockID');

    expect(window.alert).toHaveBeenCalledWith('Profile loading failed');
    expect(mockUserService.getUserProfile).toHaveBeenCalled();
  });

  it('#getForeignUserProfile should change the parameters of profile if request is successfull', () => {
    const mockData = new MockData();
    const mockUserProfile = mockData.mockUserProfile;
    mockUserService.getForeignUserProfile.and.returnValue(of(mockUserProfile));
    component.getForeignUserProfile('mockUserID', 'mockForeignUserID');

    expect(component.userProfileCard).toEqual(mockUserProfile.userProfileCard);
    expect(component.ownTweets).toEqual(mockUserProfile.ownTweets);
    expect(component.nonReplyOwnTweets).toEqual(
      mockUserProfile.nonReplyOwnTweets
    );
    expect(component.mediaTypeTweets).toEqual(mockUserProfile.mediaTypeTweets);
    expect(component.likedTweets).toEqual(mockUserProfile.likedTweets);
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalled();
  });

  it('#getForeignUserProfile display alert if request fails', () => {
    spyOn(window, 'alert');
    mockUserService.getForeignUserProfile.and.returnValue(
      throwError(new HttpResponse({ status: 400 }))
    );
    component.getForeignUserProfile('mockUserID', 'mockForeignUserID');

    expect(window.alert).toHaveBeenCalledWith('Profile loading failed');
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalled();
  });

  it('#show1 should change boolean parameters', () => {
    component.show1();
    expect(component.toggle1).toBeTrue();
    expect(component.toggle2).toBeFalse();
    expect(component.toggle3).toBeFalse();
    expect(component.toggle4).toBeFalse();
  });

  it('#show2 should change boolean parameters', () => {
    component.show2();
    expect(component.toggle1).toBeFalse();
    expect(component.toggle2).toBeTrue();
    expect(component.toggle3).toBeFalse();
    expect(component.toggle4).toBeFalse();
  });

  it('#show3 should change boolean parameters', () => {
    component.show3();
    expect(component.toggle1).toBeFalse();
    expect(component.toggle2).toBeFalse();
    expect(component.toggle3).toBeTrue();
    expect(component.toggle4).toBeFalse();
  });

  it('#show4 should change boolean parameters', () => {
    component.show4();
    expect(component.toggle1).toBeFalse();
    expect(component.toggle2).toBeFalse();
    expect(component.toggle3).toBeFalse();
    expect(component.toggle4).toBeTrue();
  });
});

class MockData {
  private mockUserProfileCard = {
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

  private mockTweet = {
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

  mockUserData = {
    username: 'mockUsername',
    fullname: 'mockFullname',
    id: 'mockID',
    profilePicPath: 'mockProfilePicPath',
    token: 'mockToken',
  };

  mockUserDataForCallingGetForeignUserProfile = {
    username: 'mockUsername',
    fullname: 'mockFullname',
    id: 'differentMockID',
    profilePicPath: 'mockProfilePicPath',
    token: 'mockToken',
  };
}
