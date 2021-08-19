import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

import { TweetReplyStreamComponent } from './tweet-reply-stream.component';

describe('TweetReplyStreamComponent', () => {
  let component: TweetReplyStreamComponent;
  let fixture: ComponentFixture<TweetReplyStreamComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockData:MockData;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', [
      'getTweetReplyStream','getTweetID'
    ]);

    await TestBed.configureTestingModule({
      declarations: [TweetReplyStreamComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetReplyStreamComponent);
    component = fixture.componentInstance;
    mockData = new MockData();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call #refreshPage when data service returns null', () =>{
    mockDataService.tweetReplyStream = null;
    const refreshSpy = spyOn(component,'refreshPage');
    fixture.detectChanges();

    expect(refreshSpy).toHaveBeenCalled();
  });

  it('#refreshPage should return expected data if request is succesfull', () =>{
    const mockTweet = mockData.mockTweet;
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    mockTweetService.getTweetID.and.returnValue('mockTweetID');
    mockTweetService.getTweetReplyStream.and.returnValue(of([mockTweet]))
    component.refreshPage();

    expect(component.tweetReplyStream).toEqual([mockTweet]);
  });

  it('#refreshPage should display error alert if request fails', () =>{
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(mockData.mockUserData);
    mockTweetService.getTweetID.and.returnValue('mockTweetID');
    mockTweetService.getTweetReplyStream.and.returnValue(throwError(new HttpResponse({status:400})))
    component.refreshPage();

    expect(window.alert).toHaveBeenCalledWith('Error: Cant load tweet reply stream');
  });

  it('#refreshPage should display error alert if none data comes from local storage', () =>{
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);
    mockTweetService.getTweetID.and.returnValue(null);
    component.refreshPage();

    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });
});

class MockData {
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
