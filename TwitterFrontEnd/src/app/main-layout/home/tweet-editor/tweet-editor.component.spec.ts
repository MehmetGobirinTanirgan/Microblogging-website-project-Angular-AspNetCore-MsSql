import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validator } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { TweetEditorComponent } from './tweet-editor.component';
import { HttpResponse } from '@angular/common/http';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';
import { MockTweetDisplay } from 'src/app/core/test-objects/MockTweetDisplay';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

describe('TweetEditorComponent', () => {
  let component: TweetEditorComponent;
  let fixture: ComponentFixture<TweetEditorComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockTweetService: jasmine.SpyObj<TweetService>;
  let mockValidatorService: jasmine.SpyObj<ValidatorService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const tweetServiceSpyObj = jasmine.createSpyObj('TweetService', ['addNewTweet']);
    const validatorServiceSpyObj = jasmine.createSpyObj('ValidatorService', ['atLeastOne']);
    await TestBed.configureTestingModule({
      declarations: [TweetEditorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        FormBuilder,
        { provide: ValidatorService, useValue: validatorServiceSpyObj },
      ],
    })
      .overrideProvider(TweetService, { useValue: tweetServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockTweetService = TestBed.inject(TweetService) as jasmine.SpyObj<TweetService>;
    mockValidatorService = TestBed.inject(ValidatorService) as jasmine.SpyObj<ValidatorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should assign the user`s info to #userInfo and calling form creation when auth. service returns data correctly', () => {
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    const tweetSubmitFormSpy = spyOn(component, 'createTweetSubmitForm');
    tweetSubmitFormSpy.and.callThrough();
    fixture.detectChanges();
    expect(component.userInfo).toEqual(mockUserInfo);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
    expect(tweetSubmitFormSpy).toHaveBeenCalled();
  });

  it('#ngOnInit should display error when auth. service returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });

  it('#createTweetSubmitForm should successfully create the form', () => {
    const tweetSubmitFormSpy = spyOn(component, 'createTweetSubmitForm');
    tweetSubmitFormSpy.and.callThrough();
    const tweetSubmitFormValues = {
      tweetDetail: '',
      imageFiles: null,
    };
    component.createTweetSubmitForm();
    expect(component.tweetSubmitForm.value).toEqual(tweetSubmitFormValues);
  });

  it('#addFiles should add image files to #imageFiles', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([], 'mockFileName1'));
    dataTransfer.items.add(new File([], 'mockFileName2'));
    component.addFiles(dataTransfer.files);
    expect(component.imageFiles).toEqual(dataTransfer.files);
    expect(component.imageFiles[0].name).toEqual(dataTransfer.files[0].name);
    expect(component.imageFiles[1].name).toEqual(dataTransfer.files[1].name);
  });

  it('#tweetSubmit should send a new tweet with output #addedNewTweet when request returns response succesfully', () => {
    const mockUserInfo = new MockUserInfo();
    const mockTweet = new MockTweetDisplay();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    fixture.detectChanges();
    const tweetSubmitForm = component.tweetSubmitForm;
    tweetSubmitForm.controls.tweetDetail.setValue('mockTweetDetail');
    tweetSubmitForm.controls.imageFiles.setValue(null);
    mockTweetService.addNewTweet.and.returnValue(of(mockTweet));
    const tweetSubmitFormResetSpy = spyOn(tweetSubmitForm, 'reset');
    spyOn(component.addedNewTweet, 'emit');
    component.tweetSubmit();
    expect(tweetSubmitFormResetSpy).toHaveBeenCalled();
    expect(component.addedNewTweet.emit).toHaveBeenCalledWith(mockTweet);
  });

  it('#tweetSubmit should display error when request fails', () => {
    spyOn(window, 'alert');
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    fixture.detectChanges();
    const tweetSubmitForm = component.tweetSubmitForm;
    tweetSubmitForm.controls.tweetDetail.setValue('mockTweetDetail');
    tweetSubmitForm.controls.imageFiles.setValue(null);
    mockTweetService.addNewTweet.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.tweetSubmit();
    expect(window.alert).toHaveBeenCalledWith('Error: Tweet posting failed');
  });
});
