import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { MockTweetDisplay } from 'src/app/core/test-objects/MockTweetDisplay';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';
import { TweetReplyStreamComponent } from './tweet-reply-stream.component';

describe('TweetReplyStreamComponent', () => {
  let component: TweetReplyStreamComponent;
  let fixture: ComponentFixture<TweetReplyStreamComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', ['getTweetReplyStream', 'getTweetID']);
    const mockActivatedRoute = {
      params: of({ tweetID: 'mockTweetID' }),
    };

    await TestBed.configureTestingModule({
      declarations: [TweetReplyStreamComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    mockTweetService = TestBed.inject(TweetService) as jasmine.SpyObj<TweetService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetReplyStreamComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call #getTweetReplyStream', () => {
    const getTweetReplyStreamSpy = spyOn(component, 'getTweetReplyStream');
    fixture.detectChanges();
    expect(getTweetReplyStreamSpy).toHaveBeenCalled();
  });

  it('#getTweetReplyStream should return expected data if request is succesfull', () => {
    const mockTweet = new MockTweetDisplay();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(new MockUserInfo());
    component.tweetID = 'mockTweetID';
    mockTweetService.getTweetReplyStream.and.returnValue(of([mockTweet]));
    component.getTweetReplyStream();
    expect(component.tweetReplyStream).toEqual([mockTweet]);
  });

  it('#getTweetReplyStream should display error alert if request fails', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(new MockUserInfo());
    component.tweetID = 'mockTweetID';
    mockTweetService.getTweetReplyStream.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.getTweetReplyStream();
    expect(window.alert).toHaveBeenCalledWith('Error: Cant load tweet reply stream');
  });

  it('#getTweetReplyStream should display error alert if #getAuthenticatedUserInfos returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    component.getTweetReplyStream();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });
});
