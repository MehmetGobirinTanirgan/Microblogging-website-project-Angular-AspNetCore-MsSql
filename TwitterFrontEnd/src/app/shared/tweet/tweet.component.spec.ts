import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { TweetService } from 'src/services/tweet.service';
import { MockReplyModalData } from 'src/testObjects/MockReplyModalData';
import { MockTweetDisplay } from 'src/testObjects/MockTweetDisplay';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { TweetComponent } from './tweet.component';

describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let router: Router;
  let mockUserInfo: MockUserInfo;
  let mockTweet: MockTweetDisplay;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', [
      'getFollowUsername',
      'setFollowUsername',
      'getFollowFlag',
      'setFollowFlag',
    ]);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', ['delete', 'addLike', 'removeLike', 'getTweetReplyStream']);
    const followServiceSpyObj = jasmine.createSpyObj('FollowService', ['follow', 'unfollow']);

    await TestBed.configureTestingModule({
      declarations: [TweetComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), NgbDropdownModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .overrideProvider(FollowService, { useValue: followServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    mockTweetService = TestBed.inject(TweetService) as jasmine.SpyObj<TweetService>;
    mockFollowService = TestBed.inject(FollowService) as jasmine.SpyObj<FollowService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
    mockUserInfo = new MockUserInfo();
    mockTweet = new MockTweetDisplay();
    mockDataService.getFollowUsername.and.returnValue(of('mockUsername'));
    mockDataService.getFollowFlag.and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When #getAuthenticatedUserInfos returns user infos', () => {
    beforeEach(() => {
      mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    });

    it('#ngOnInit should change #username and #userProfilePicPath values', () => {
      component.tweet = mockTweet;
      fixture.detectChanges();
      expect(component.username).toEqual(mockUserInfo.username);
      expect(component.userProfilePicPath).toEqual(mockUserInfo.profilePicPath);
      expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
    });

    it('#openModal should change the values of #replyModalModel and open the modal', () => {
      mockTweet.tweetImageInfos = [
        {
          id: 'mockTweetImageID',
          imagePath: 'mockTweetImagePath',
        },
      ];
      component.tweet = mockTweet;
      fixture.detectChanges();
      const inputTweet = component.tweet;
      component.modalComponent = jasmine.createSpyObj('ReplyModalComponent', ['open']);
      component.openModal();
      const replyModalData = component.replyModal;
      expect(replyModalData.mainTweetCreatedDate).toEqual(inputTweet.createdDate);
      expect(replyModalData.mainTweetID).toEqual(inputTweet.id);
      expect(replyModalData.mainTweetDetail).toEqual(inputTweet.tweetDetail);
      expect(replyModalData.mainTweetImagePaths.length).toEqual(inputTweet.tweetImageInfos.length);
      expect(replyModalData.mainTweetFullname).toEqual(inputTweet.fullname);
      expect(replyModalData.mainTweetUsername).toEqual(inputTweet.username);
      expect(replyModalData.mainTweetUserProfilePicPath).toEqual(component.userProfilePicPath);
      expect(replyModalData.replyTweetUserProfilePicPath).toEqual(inputTweet.profilePicPath);
      expect(mockDataService.replyModalData).toEqual(JSON.stringify(replyModalData));
      expect(component.modalComponent.open).toHaveBeenCalled();
    });

    it('#deleteTweet should delete tweet and #tweetFlag should be false', () => {
      component.tweet = mockTweet;
      mockTweetService.delete.and.returnValue(of(new HttpResponse({ status: 200 })));
      component.deleteTweet();
      expect(component.tweet.tweetFlag).toBeFalse();
    });

    it('#deleteTweet should display alert when request fails', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      mockTweetService.delete.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.deleteTweet();
      expect(window.alert).toHaveBeenCalledWith('Deletion failed');
    });

    it('#likeCheck should call #removeLike when #likeFlag is true', () => {
      mockTweet.likeFlag = true;
      component.tweet = mockTweet;
      const removeLikeSpy = spyOn(component, 'removeLike');
      component.likeCheck();
      expect(removeLikeSpy).toHaveBeenCalled();
    });

    it('#likeCheck should call #like when #likeFlag is false', () => {
      mockTweet.likeFlag = false;
      component.tweet = mockTweet;
      const likeSpy = spyOn(component, 'like');
      component.likeCheck();
      expect(likeSpy).toHaveBeenCalled();
    });

    it('#like should change values', () => {
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockTweetService.addLike.and.returnValue(of(new HttpResponse({ status: 200 })));
      component.like();
      expect(component.tweet.likeCounter).toEqual(1);
      expect(component.tweet.likeFlag).toBeTrue();
    });

    it('#like should display alert when request fails', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      mockTweetService.addLike.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.like();
      expect(window.alert).toHaveBeenCalledWith('Like failed');
    });

    it('#removeLike should change values', () => {
      mockTweet.likeFlag = true;
      component.tweet = mockTweet;
      component.tweet.likeCounter = 1;
      fixture.detectChanges();
      mockTweetService.removeLike.and.returnValue(of(new HttpResponse({ status: 200 })));
      component.removeLike();
      expect(component.tweet.likeCounter).toEqual(0);
      expect(component.tweet.likeFlag).toBeFalse();
    });

    it('#removeLike should display alert when request fails', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      mockTweetService.removeLike.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.removeLike();
      expect(window.alert).toHaveBeenCalledWith('Dislike failed');
    });

    it('#follow should set follow signals via data service', () => {
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockFollowService.follow.and.returnValue(of(new HttpResponse({ status: 200 })));
      component.follow();
      expect(mockDataService.setFollowUsername).toHaveBeenCalledWith(component.tweet.username);
      expect(mockDataService.setFollowFlag).toHaveBeenCalledWith(true);
    });

    it('#follow should display fail alert when request fails', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockFollowService.follow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.follow();
      expect(window.alert).toHaveBeenCalledWith('Follow failed');
    });

    it('#unfollow should set follow signals via data service', () => {
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockFollowService.unfollow.and.returnValue(of(new HttpResponse({ status: 200 })));
      component.unfollow();
      expect(mockDataService.setFollowUsername).toHaveBeenCalledWith(component.tweet.username);
      expect(mockDataService.setFollowFlag).toHaveBeenCalledWith(false);
    });

    it('#unfollow should display fail alert when request fails', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockFollowService.unfollow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.unfollow();
      expect(window.alert).toHaveBeenCalledWith('Unfollow failed');
    });

    it('#tweetReplyStream should return expected data and navigate to tweet reply page', () => {
      const routerSpy = spyOn(router, 'navigate');
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockTweetService.getTweetReplyStream.and.returnValue(of([mockTweet, mockTweet]));
      component.tweetReplyStream();
      expect(routerSpy).toHaveBeenCalledWith([`${mockTweet.username}/status/${component.tweet.id}`]);
    });

    it('#tweetReplyStream should display alert when request fails', () => {
      const routerSpy = spyOn(router, 'navigate');
      component.tweet = mockTweet;
      fixture.detectChanges();
      mockTweetService.getTweetReplyStream.and.returnValue(throwError(new HttpResponse({ status: 400 })));
      component.tweetReplyStream();
      expect(routerSpy).toHaveBeenCalledWith([`${component.tweet.username}/status/${component.tweet.id}`]);
    });
  });

  describe('When #getAuthenticatedUserInfos returns null', () => {
    it('#ngOnInit display alert when #getAuthenticatedUserInfos returns null', () => {
      spyOn(window, 'alert');
      component.tweet = mockTweet;
      mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
      fixture.detectChanges();
      expect(window.alert).toHaveBeenCalledWith('Error: Tweet loading failed');
      expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
    });
  });
});
