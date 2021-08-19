import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { TweetService } from 'src/services/tweet.service';

import { TweetComponent } from './tweet.component';

describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let router:Router;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const dataServiceSpy = jasmine.createSpy();
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', [
      'delete',
      'addLike',
      'removeLike',
      'getTweetReplyStream',
      'setTweetID',
    ]);
    const followServiceSpyObj = jasmine.createSpyObj('FollowService', [
      'follow',
      'unfollow',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TweetComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgbDropdownModule,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpy },
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .overrideProvider(FollowService, { useValue: followServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(
      DataService
    ) as jasmine.SpyObj<DataService>;
    mockTweetService = TestBed.inject(
      TweetService
    ) as jasmine.SpyObj<TweetService>;
    mockFollowService = TestBed.inject(
      FollowService
    ) as jasmine.SpyObj<FollowService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should change #userID and #userProfilePicPath values when auth. service returns user`s data correctly', () => {
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();

    expect(component.userID).toEqual(mockUserData.id);
    expect(component.userProfilePicPath).toEqual(mockUserData.profilePicPath);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#ngOnInit display alert when auth. service returns null', () => {
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Error: Tweet loading failed');
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#openModal should change the values of #replyModalModel and open the modal', () => {
    const mockData = new MockData();
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    fixture.detectChanges();

    const mockTweet = mockData.mockTweet;
    component.tweet = mockTweet;
    const replyModel = component.replyModalModel;
    const inputTweet = component.tweet;
    const modalSpy = jasmine.createSpyObj('ReplyModalComponent',['open']);
    component.modalComponent = modalSpy;
    component.openModal();

    expect(replyModel.MainTweetCreatedDate).toEqual(inputTweet.createdDate);
    expect(replyModel.MainTweetID).toEqual(inputTweet.id);
    expect(replyModel.MainTweetDetail).toEqual(inputTweet.tweetDetail);
    expect(replyModel.MainTweetImagePaths.length).toEqual(inputTweet.tweetImageInfos.length);
    expect(replyModel.MainTweetUserFullname).toEqual(inputTweet.fullname);
    expect(replyModel.MainTweetUserUsername).toEqual(inputTweet.username);
    expect(replyModel.MainTweetUserProfilePicPath).toEqual(component.userProfilePicPath);
    expect(replyModel.UserID).toEqual(component.userID);
    expect(replyModel.ReplyTweetUserProfilePicPath).toEqual(inputTweet.profilePicPath);
    expect(mockDataService.replyModalData).toEqual(JSON.stringify(replyModel));
    expect(component.modalComponent.open).toHaveBeenCalled();
  });

  it('#deleteTweet should delete tweet and #tweetFlag should be false', () => {
    const mockData = new MockData();
    component.tweet = mockData.mockTweet;
    mockTweetService.delete.and.returnValue(of(new HttpResponse({status:200})));
    component.deleteTweet();

    expect(component.tweetFlag).toBeFalse();
  });

  it('#deleteTweet should display alert when request fails', () => {
    const mockData = new MockData();
    spyOn(window,'alert');
    component.tweet = mockData.mockTweet;
    mockTweetService.delete.and.returnValue(throwError(new HttpResponse({status:400})));
    component.deleteTweet();

    expect(window.alert).toHaveBeenCalledWith('Deletion failed');
  });

  it('#likeCheck should call #removeLike when #likeFlag is true', () => {
    const mockData = new MockData();
    mockData.mockTweet.likeFlag = true;
    component.tweet = mockData.mockTweet;
    const removeLikeSpy = spyOn(component,'removeLike');
    component.likeCheck();

    expect(removeLikeSpy).toHaveBeenCalled();
  });

  it('#likeCheck should call #like when #likeFlag is false', () => {
    const mockData = new MockData();
    mockData.mockTweet.likeFlag = false;
    component.tweet = mockData.mockTweet;
    const likeSpy = spyOn(component,'like');
    component.likeCheck();

    expect(likeSpy).toHaveBeenCalled();
  });

  it('#like should change values', () => {
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    component.tweet = mockTweet;
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    fixture.detectChanges();

    mockTweetService.addLike.and.returnValue(of(new HttpResponse({status:200})));
    component.like();

    expect(component.tweet.likeCounter).toEqual(2);
    expect(component.tweet.likeFlag).toBeTrue();
  });

  it('#like should display alert when request fails', () => {
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    spyOn(window,'alert');
    component.tweet = mockTweet;
    mockTweetService.addLike.and.returnValue(throwError(new HttpResponse({status:400})));
    component.like();

    expect(window.alert).toHaveBeenCalledWith('Like failed');
  });

  it('#removeLike should change values', () => {
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    mockTweet.likeFlag = true;
    component.tweet = mockTweet;
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    fixture.detectChanges();
    mockTweetService.removeLike.and.returnValue(of(new HttpResponse({status:200})));
    component.removeLike();

    expect(component.tweet.likeCounter).toEqual(0);
    expect(component.tweet.likeFlag).toBeFalse();
  });

  it('#removeLike should display alert when request fails', () => {
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    spyOn(window,'alert');
    component.tweet = mockTweet;
    mockTweetService.removeLike.and.returnValue(throwError(new HttpResponse({status:400})));
    component.removeLike();

    expect(window.alert).toHaveBeenCalledWith('Dislike failed');
  });

  it('#follow should display success alert', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockData.mockTweet;
    fixture.detectChanges();
    mockFollowService.follow.and.returnValue(of(new HttpResponse({status:200})));
    component.follow();

    expect(window.alert).toHaveBeenCalledWith('Following');
  });

  it('#follow should display fail alert', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockData.mockTweet;
    fixture.detectChanges();
    mockFollowService.follow.and.returnValue(throwError(new HttpResponse({status:400})));
    component.follow();

    expect(window.alert).toHaveBeenCalledWith('Follow failed');
  });

  it('#unfollow should display success alert', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockData.mockTweet;
    fixture.detectChanges();
    mockFollowService.unfollow.and.returnValue(of(new HttpResponse({status:200})));
    component.unfollow();

    expect(window.alert).toHaveBeenCalledWith('Unfollowed');
  });

  it('#unfollow should display fail alert', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockData.mockTweet;
    fixture.detectChanges();
    mockFollowService.unfollow.and.returnValue(throwError(new HttpResponse({status:400})));
    component.unfollow();

    expect(window.alert).toHaveBeenCalledWith('Unfollow failed');
  });

  it('#tweetReplyStream should return expected data and navigate to tweet reply page', () => {
    const routerSpy = spyOn(router, 'navigate');
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockTweet;
    fixture.detectChanges();
    mockTweetService.getTweetReplyStream.and.returnValue(of([mockTweet,mockTweet]));
    component.tweetReplyStream();

    expect(mockDataService.tweetReplyStream).toEqual([mockTweet,mockTweet]);
    expect(mockTweetService.setTweetID).toHaveBeenCalledWith(component.tweet.id);
    expect(routerSpy).toHaveBeenCalledWith([`${mockTweet.userID}/status/${component.tweet.id}`]);
  });

  it('#tweetReplyStream should display alert when request fails', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    component.tweet = mockTweet;
    fixture.detectChanges();
    mockTweetService.getTweetReplyStream.and.returnValue(throwError(new HttpResponse({status:400})));
    component.tweetReplyStream();

    expect(window.alert).toHaveBeenCalledWith('Error: Cant load tweet reply stream');
  });
});

class MockData {
  mockReplyModal = {
    MainTweetID: 'mockID',
    MainTweetUserProfilePicPath: 'mockPath',
    MainTweetUserFullname: 'mockFullname',
    MainTweetUserUsername: 'mockUsername',
    MainTweetCreatedDate: new Date(),
    MainTweetDetail: 'mockDetail',
    MainTweetImagePaths: ['mockPath1', 'mockPath2'],
    ReplyTweetUserProfilePicPath: 'mockPath',
    UserID: 'mockID',
  };

  mockUserData = {
    username: 'mockUsername',
    fullname: 'mockFullname',
    id: 'mockID',
    profilePicPath: 'mockProfilePicPath',
    token: 'mockToken',
  };

  mockTweet = {
    id: '1',
    userID: 'mockUserID',
    createdDate: new Date(2001, 1, 1),
    tweetDetail: 'mockTweetDetail',
    profilePicPath: 'mockProfilePicPath',
    fullname: 'mockFullname',
    username: 'mockUsername',
    replyCounter: 1,
    retweetCounter: 1,
    likeCounter: 1,
    followFlag: true,
    likeFlag: false,
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
}
