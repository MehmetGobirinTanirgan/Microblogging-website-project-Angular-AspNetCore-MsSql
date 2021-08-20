import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { TweetService } from 'src/services/tweet.service';
import { of, throwError } from 'rxjs';
import { TweetEditorComponent } from './tweet-editor.component';
import { HttpResponse } from '@angular/common/http';

describe('TweetEditorComponent', () => {
  let component: TweetEditorComponent;
  let fixture: ComponentFixture<TweetEditorComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', [
      'addNewTweet',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TweetEditorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        FormBuilder,
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockTweetService = TestBed.inject(
      TweetService
    ) as jasmine.SpyObj<TweetService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should assign the user`s data to #userData and calling form creation when auth. service returns data correctly', () => {
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    const formSpy = spyOn(component, 'createTweetSubmitForm');
    formSpy.and.callThrough();
    fixture.detectChanges();

    expect(component.userData).toEqual(mockUserData);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
    expect(formSpy).toHaveBeenCalled();
  });

  it('#ngOnInit should display error when auth. service returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getUserData.and.returnValue(null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });

  it('#createTweetSubmitForm ', () => {
    const formSpy = spyOn(component, 'createTweetSubmitForm');
    formSpy.and.callThrough();
    const tweetSubmitFormValues = {
      tweetDetail: '',
      imageFiles: null,
    };
    component.createTweetSubmitForm();

    expect(component.tweetSubmitForm.value).toEqual(tweetSubmitFormValues);
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

  it('#tweetSubmit should send a new tweet with output #addedNewTweet when request returns succesfully', () => {
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    const mockTweet = mockData.mockTweet;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();
    const tweetSubmitForm = component.tweetSubmitForm;
    tweetSubmitForm.controls.tweetDetail.setValue('mockTweetDetail');
    tweetSubmitForm.controls.imageFiles.setValue(null);
    mockTweetService.addNewTweet.and.returnValue(of(mockTweet));
    const formResetSpy = spyOn(tweetSubmitForm,'reset');
    spyOn(component.addedNewTweet,'emit');
    component.tweetSubmit();

    expect(formResetSpy).toHaveBeenCalled();
    expect(component.addedNewTweet.emit).toHaveBeenCalledWith(JSON.stringify(mockTweet));
  });

  it('#tweetSubmit should display error when request fails', () => {
    spyOn(window,'alert');
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();
    const tweetSubmitForm = component.tweetSubmitForm;
    tweetSubmitForm.controls.tweetDetail.setValue('mockTweetDetail');
    tweetSubmitForm.controls.imageFiles.setValue(null);
    mockTweetService.addNewTweet.and.returnValue(throwError(new HttpResponse({status:400})));
    component.tweetSubmit();

    expect(window.alert).toHaveBeenCalledWith('Error: Tweet posting failed');
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
