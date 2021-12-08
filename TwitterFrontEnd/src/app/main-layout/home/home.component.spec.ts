import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';
import { MockTweetDisplay } from 'src/app/core/test-objects/MockTweetDisplay';
import { TweetService } from 'src/app/core/services/tweet.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', ['getAllRelationalTweets']);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['getFollowUsername', 'getNewReplyTweet']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockTweetService = TestBed.inject(TweetService) as jasmine.SpyObj<TweetService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call #getAllRelationalTweets, #getFollowUsername, #getNewReplyTweet', () => {
    mockDataService.getFollowUsername.and.returnValue(of('mockUsername'));
    mockDataService.getNewReplyTweet.and.returnValue(of(new MockTweetDisplay()));
    const getAllRelationalTweetsSpy = spyOn(component, 'getAllRelationalTweets');
    fixture.detectChanges();
    expect(getAllRelationalTweetsSpy).toHaveBeenCalled();
    expect(mockDataService.getFollowUsername).toHaveBeenCalled();
    expect(mockDataService.getNewReplyTweet).toHaveBeenCalled();
  });

  it('#getAllRelationalTweets should return expected data', () => {
    const mockTweets = [new MockTweetDisplay()];
    const getAllRelationalTweetsSpy = spyOn(component, 'getAllRelationalTweets');
    getAllRelationalTweetsSpy.and.callThrough();
    mockTweetService.getAllRelationalTweets.and.returnValue(of(mockTweets));
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(new MockUserInfo());
    component.getAllRelationalTweets();
    expect(component.tweets).toEqual(mockTweets);
    expect(getAllRelationalTweetsSpy).toHaveBeenCalled();
    expect(mockTweetService.getAllRelationalTweets).toHaveBeenCalled();
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#getAllRelationalTweets should display error alert when request fails', () => {
    const getAllRelationalTweetsSpy = spyOn(component, 'getAllRelationalTweets');
    getAllRelationalTweetsSpy.and.callThrough();
    spyOn(window, 'alert');
    mockTweetService.getAllRelationalTweets.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(new MockUserInfo());
    component.getAllRelationalTweets();
    expect(getAllRelationalTweetsSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error: Cant load tweets');
    expect(mockTweetService.getAllRelationalTweets).toHaveBeenCalled();
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#getAllRelationalTweets should display error alert when #getAuthenticatedUserInfos returns null', () => {
    const getAllRelationalTweetsSpy = spyOn(component, 'getAllRelationalTweets');
    getAllRelationalTweetsSpy.and.callThrough();
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    component.getAllRelationalTweets();
    expect(getAllRelationalTweetsSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#addNewTweet should add a new tweet into #tweets', () => {
    const addNewTweetSpy = spyOn(component, 'addNewTweet');
    const mockTweet = new MockTweetDisplay();
    component.tweets = [mockTweet];
    addNewTweetSpy.and.callThrough();
    component.addNewTweet(mockTweet);
    expect(addNewTweetSpy).toHaveBeenCalled();
    expect(component.tweets).toEqual([mockTweet, mockTweet]);
  });
});
