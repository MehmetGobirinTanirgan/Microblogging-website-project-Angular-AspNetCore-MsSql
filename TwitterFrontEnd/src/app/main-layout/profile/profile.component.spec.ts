import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { MockUserProfile } from 'src/testObjects/MockUserProfile';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getMainUserProfile', 'getForeignUserProfile']);
    const mockActivatedRoute = {
      parent: {
        params: of({ username: 'mockIncomingUsername' }),
      },
      params: of({ tweet_section: 'mockSection' }),
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideProvider(UserService, { useValue: userServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.mainUrl = 'mockUrl/mock';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should effect #username value if auth. service gets data correctly and call #getMainUserProfile according to activatedRoute', () => {
    const mockUserProfile = new MockUserProfile();
    const mockUserInfo = new MockUserInfo();
    activatedRoute.parent!.params = of({ username: 'mockUsername' });
    const activatedRouteParentSpy = spyOn(activatedRoute.parent!.params, 'subscribe');
    const activatedRouteParamsSpy = spyOn(activatedRoute.params, 'subscribe');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    activatedRouteParentSpy.and.callThrough();
    activatedRouteParamsSpy.and.callThrough();
    component.incomingUsername = component.username;
    mockUserService.getMainUserProfile.and.returnValue(of(mockUserProfile));
    mockUserService.getForeignUserProfile.and.returnValue(of(mockUserProfile));
    component.incomingUsername = component.username;
    fixture.detectChanges();
    expect(component.username).toEqual(mockUserInfo.username);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
    expect(mockUserService.getMainUserProfile).toHaveBeenCalledWith(component.username!);
    expect(activatedRouteParentSpy).toHaveBeenCalled();
    expect(activatedRouteParamsSpy).toHaveBeenCalled();
    expect(component.displaySection).toBe('mockSection');
  });

  it('#ngOnInit should effect #username value if auth. service gets data correctly and call #getForeignUserProfile according to activatedRoute', () => {
    const mockUserProfile = new MockUserProfile();
    const mockUserInfo = new MockUserInfo();
    const activatedRouteParentSpy = spyOn(activatedRoute.parent!.params, 'subscribe');
    const activatedRouteParamsSpy = spyOn(activatedRoute.params, 'subscribe');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    activatedRouteParentSpy.and.callThrough();
    activatedRouteParamsSpy.and.callThrough();
    mockUserService.getForeignUserProfile.and.returnValue(of(mockUserProfile));
    fixture.detectChanges();
    expect(component.username).toEqual(mockUserInfo.username);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalledWith(component.username!, component.incomingUsername!);
    expect(activatedRouteParentSpy).toHaveBeenCalled();
    expect(activatedRouteParamsSpy).toHaveBeenCalled();
    expect(component.displaySection).toBe('mockSection');
  });

  it('#ngOnInit should should display alert if #username is null', () => {
    spyOn(window, 'alert');
    fixture.detectChanges();
    expect(component.username).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });

  it('#ngOnInit should should display alert if #foreignUsername is null', () => {
    spyOn(window, 'alert');
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    activatedRoute.parent!.params = of({ username: null });
    const activatedRouteParentSpy = spyOn(activatedRoute.parent!.params, 'subscribe');
    activatedRouteParentSpy.and.callThrough();
    const activatedRouteParamsSpy = spyOn(activatedRoute.params, 'subscribe');
    activatedRouteParamsSpy.and.callThrough();
    fixture.detectChanges();
    expect(component.incomingUsername).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Routing URL error');
  });

  it('#getMainUserProfile should change the parameters of profile if request is successfull', () => {
    const mockUserProfile = new MockUserProfile();
    mockUserService.getMainUserProfile.and.returnValue(of(mockUserProfile));
    component.getMainUserProfile('mockID');
    expect(component.userProfileCard).toEqual(mockUserProfile.userProfileCard);
    expect(component.tweetsAndReplies).toEqual(mockUserProfile.tweetsAndReplies);
    expect(component.tweets).toEqual(mockUserProfile.tweets);
    expect(component.media).toEqual(mockUserProfile.media);
    expect(component.likes).toEqual(mockUserProfile.likes);
    expect(mockUserService.getMainUserProfile).toHaveBeenCalled();
  });

  it('#getMainUserProfile display alert if request fails', () => {
    spyOn(window, 'alert');
    mockUserService.getMainUserProfile.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.getMainUserProfile('mockID');
    expect(window.alert).toHaveBeenCalledWith('Profile loading failed');
    expect(mockUserService.getMainUserProfile).toHaveBeenCalled();
  });

  it('#getForeignUserProfile should change the parameters of profile if request is successfull', () => {
    const mockUserProfile = new MockUserProfile();
    mockUserService.getForeignUserProfile.and.returnValue(of(mockUserProfile));
    component.getForeignUserProfile('mockUserID', 'mockForeignUserID');
    expect(component.userProfileCard).toEqual(mockUserProfile.userProfileCard);
    expect(component.tweetsAndReplies).toEqual(mockUserProfile.tweetsAndReplies);
    expect(component.tweets).toEqual(mockUserProfile.tweets);
    expect(component.media).toEqual(mockUserProfile.media);
    expect(component.likes).toEqual(mockUserProfile.likes);
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalled();
  });

  it('#getForeignUserProfile should display error alert if request fails', () => {
    spyOn(window, 'alert');
    mockUserService.getForeignUserProfile.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.getForeignUserProfile('mockUserID', 'mockForeignUserID');
    expect(window.alert).toHaveBeenCalledWith('Profile loading failed');
    expect(mockUserService.getForeignUserProfile).toHaveBeenCalled();
  });

  it('#show1', () => {
    component.show1();
    expect(component.displaySection).toBe('');
  });

  it('#show2', () => {
    component.show2();
    expect(component.displaySection).toBe('with_replies');
  });

  it('#show3', () => {
    component.show3();
    expect(component.displaySection).toBe('media');
  });

  it('#show4', () => {
    component.show4();
    expect(component.displaySection).toBe('likes');
  });
});
