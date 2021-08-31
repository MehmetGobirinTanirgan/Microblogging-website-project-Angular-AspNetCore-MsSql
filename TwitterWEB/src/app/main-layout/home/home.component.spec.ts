import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { TweetService } from 'src/services/tweet.service';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', [
      'getAllTweets',
    ]);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .overrideProvider(TweetService,{useValue:tweetServiceSpyObj})
    .compileComponents();

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockTweetService = TestBed.inject(
      TweetService
    ) as jasmine.SpyObj<TweetService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call #getAllTweets',() =>{
    const getAllTweetsSpy = spyOn(component,'getAllTweets')
    fixture.detectChanges();
    expect(getAllTweetsSpy).toHaveBeenCalled();
  });

  it('#getAllTweets should return expected data', () => {
    const mockData = new MockData();
    const mockTweets = mockData.mockTweets;
    const getAllTweetsSpy = spyOn(component, 'getAllTweets');
    getAllTweetsSpy.and.callThrough();
    mockTweetService.getAllTweets.and.returnValue(of(mockTweets));
    mockAuthService.getUserData.and.returnValue({
      id: 'mockID',
      username: 'mockUsername',
      fullname: 'mockFullname',
      token: 'mockToken',
      profilePicPath: 'mockProfilePicPath',
    });

    component.getAllTweets();
    expect(component.tweets).toEqual(mockTweets);
    expect(getAllTweetsSpy).toHaveBeenCalled();
    expect(mockTweetService.getAllTweets).toHaveBeenCalled();
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#getAllTweets should display error alert when request returns error', () => {
    const getAllTweetsSpy = spyOn(component, 'getAllTweets');
    getAllTweetsSpy.and.callThrough();
    spyOn(window,'alert');
    mockTweetService.getAllTweets.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    mockAuthService.getUserData.and.returnValue({
      id: 'mockID',
      username: 'mockUsername',
      fullname: 'mockFullname',
      token: 'mockToken',
      profilePicPath: 'mockProfilePicPath',
    });

    component.getAllTweets();
    expect(getAllTweetsSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Error: Can't load tweets");
    expect(mockTweetService.getAllTweets).toHaveBeenCalled();
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#getAllTweets should display error alert when no id returns from authentication service', () => {
    const getAllTweetsSpy = spyOn(component, 'getAllTweets');
    getAllTweetsSpy.and.callThrough();
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);

    component.getAllTweets();
    expect(getAllTweetsSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Local storage error");
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#addNewTweet should add a new tweet into #tweets',() =>{
    const addNewTweetSpy = spyOn(component,'addNewTweet');
    const mockData = new MockData();
    const mockTweet = mockData.mockTweet;
    component.tweets = mockData.mockTweets;
    const expectedTweets = [mockTweet,mockTweet];
    addNewTweetSpy.and.callThrough();
    component.addNewTweet(JSON.stringify(mockTweet));

    expect(addNewTweetSpy).toHaveBeenCalled();
    expect(component.tweets).toEqual(expectedTweets);
  });
});

class MockData {
  mockTweet = {
    id: '1',
    userID: 'mockUserID',
    createdDate: JSON.parse(JSON.stringify(new Date())),
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

  mockTweets = [this.mockTweet];
}
