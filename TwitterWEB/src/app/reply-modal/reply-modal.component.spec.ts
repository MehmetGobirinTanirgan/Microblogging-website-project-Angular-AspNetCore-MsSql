import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';
import {of, throwError} from 'rxjs'
import { ReplyModalComponent } from './reply-modal.component';
import { HttpResponse } from '@angular/common/http';

describe('ReplyModalComponent', () => {
  let component: ReplyModalComponent;
  let fixture: ComponentFixture<ReplyModalComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', [
      'addReplyTweet',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ReplyModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        FormBuilder,
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
    fixture = TestBed.createComponent(ReplyModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#open should change #replyModalData and call #createReplyForm', () => {
    const mockData = new MockData();
    mockDataService.replyModalData = JSON.stringify(mockData.mockReplyModal);
    const formSpy = spyOn(component, 'createReplyForm');
    component.open();

    expect(component.replyModalData).toEqual(
      JSON.parse(mockDataService.replyModalData)
    );
    expect(formSpy).toHaveBeenCalled();
  });

  it('#createReplyForm checking form creation', () => {
    const formSpy = spyOn(component, 'createReplyForm');
    formSpy.and.callThrough();
    const replyFormValue = {
      replyTweetDetail: '',
      replyTweetImageFiles: null,
    };
    component.createReplyForm();

    expect(component.replyForm.value).toEqual(replyFormValue);
    expect(formSpy).toHaveBeenCalled();
  });

  it('#addFiles should effect #imageFiles', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([], 'mockFileName1'));
    dataTransfer.items.add(new File([], 'mockFileName2'));
    component.addFiles(dataTransfer.files);

    expect(component.imageFiles).toEqual(dataTransfer.files);
    expect(component.imageFiles[0].name).toEqual(dataTransfer.files[0].name);
    expect(component.imageFiles[1].name).toEqual(dataTransfer.files[1].name);
  });

  it('#addReply should display succes alert when request returns succesfully', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    const mockTweet = mockData.mockTweet;
    mockDataService.replyModalData = JSON.stringify(mockData.mockReplyModal);
    component.open();
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockTweetService.addReplyTweet.and.returnValue(of(mockTweet));
    const replyForm = component.replyForm;
    replyForm.controls.replyTweetDetail.setValue('mockTweetDetail');
    replyForm.controls.replyTweetImageFiles.setValue(null);
    component.addReply();

    expect(window.alert).toHaveBeenCalledWith('Replied successfully');
  });

  it('#addReply should display fail alert when request fails', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockDataService.replyModalData = JSON.stringify(mockData.mockReplyModal);
    component.open();
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockTweetService.addReplyTweet.and.returnValue(throwError(new HttpResponse({status:400})));
    component.addReply();

    expect(window.alert).toHaveBeenCalledWith('Reply process failed');
  });

  it('#addReply should display fail alert when auth. service returns null', () => {
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);
    component.addReply();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
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
}
