import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';
import { of, throwError } from 'rxjs';
import { ReplyModalComponent } from './reply-modal.component';
import { HttpResponse } from '@angular/common/http';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { MockReplyModalData } from 'src/testObjects/MockReplyModalData';
import { MockTweetDisplay } from 'src/testObjects/MockTweetDisplay';
import { ValidatorService } from 'src/services/validator.service';

describe('ReplyModalComponent', () => {
  let component: ReplyModalComponent;
  let fixture: ComponentFixture<ReplyModalComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockValidatorService: jasmine.SpyObj<ValidatorService>;

  beforeEach(async () => {
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['setNewReplyTweet', 'getNewReplyTweet']);
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', ['addReplyTweet']);
    const validatorServiceSpy = jasmine.createSpyObj('ValidatorService', ['atLeastOne']);

    await TestBed.configureTestingModule({
      declarations: [ReplyModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: DataService, useValue: dataServiceSpyObj },
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: ValidatorService, useValue: validatorServiceSpy },
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .compileComponents();
    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    mockTweetService = TestBed.inject(TweetService) as jasmine.SpyObj<TweetService>;
    mockValidatorService = TestBed.inject(ValidatorService) as jasmine.SpyObj<ValidatorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#open should change #replyModalData and call #createReplyForm', () => {
    mockDataService.replyModalData = JSON.stringify(new MockReplyModalData());
    const formSpy = spyOn(component, 'createReplyForm');
    component.open();
    expect(component.replyModalData).toEqual(JSON.parse(mockDataService.replyModalData));
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

  it('#addReply should get new reply tweet data from dataservice', () => {
    const mockUserInfo = new MockUserInfo();
    const mockTweet = new MockTweetDisplay();
    mockDataService.replyModalData = JSON.stringify(new MockReplyModalData());
    component.open();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    mockTweetService.addReplyTweet.and.returnValue(of(mockTweet));
    const replyForm = component.replyForm;
    replyForm.controls.replyTweetDetail.setValue('mockTweetDetail');
    replyForm.controls.replyTweetImageFiles.setValue(null);
    component.addReply();
    expect(mockDataService.setNewReplyTweet).toHaveBeenCalled();
  });

  it('#addReply should display fail alert when request fails', () => {
    spyOn(window, 'alert');
    const mockUserInfo = new MockUserInfo();
    mockDataService.replyModalData = JSON.stringify(new MockReplyModalData());
    component.open();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    mockTweetService.addReplyTweet.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.addReply();
    expect(window.alert).toHaveBeenCalledWith('Reply process failed');
  });

  it('#addReply should display fail alert when #getAuthenticatedUserInfos returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    component.addReply();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });
});
