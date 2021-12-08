import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { FollowService } from 'src/app/core/services/follow.service';
import { MockFollowList } from 'src/app/core/test-objects/MockFollowList';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';
import { MockUserProfileCard } from 'src/app/core/test-objects/MockUserProfileCard';
import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let router: Router;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', [
      'getFollowUsername',
      'setFollowUsername',
      'getFollowFlag',
      'setFollowFlag',
    ]);
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const followServiceSpyObj = jasmine.createSpyObj('FollowService', [
      'follow',
      'unfollow',
      'getFollowList',
      'setDisplayFlag',
      'setUserID',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProfileCardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpy },
      ],
    })
      .overrideProvider(FollowService, { useValue: followServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    mockFollowService = TestBed.inject(FollowService) as jasmine.SpyObj<FollowService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should effect #username if #getAuthenticatedUserInfos returns user`s info', () => {
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    mockDataService.getFollowUsername.and.returnValue(of('mockUsername'));
    mockDataService.getFollowFlag.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component.authenticatedUsername).toEqual(mockUserInfo.username);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if #getAuthenticatedUserInfos returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#follow should post follow request', () => {
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.follow.and.returnValue(of(new HttpResponse({ status: 200 })));
    component.follow();
    expect(mockFollowService.follow).toHaveBeenCalled();
    expect(mockDataService.setFollowUsername).toHaveBeenCalledOnceWith(component.userProfileCard.username);
    expect(mockDataService.setFollowFlag).toHaveBeenCalledWith(true);
  });

  it('#follow should display error alert if request fails', () => {
    spyOn(window, 'alert');
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.follow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.follow();
    expect(window.alert).toHaveBeenCalledWith('Following failed');
    expect(mockFollowService.follow).toHaveBeenCalled();
  });

  it('#unfollow should post unfollow request', () => {
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.unfollow.and.returnValue(of(new HttpResponse({ status: 200 })));
    component.unfollow();
    expect(mockDataService.setFollowUsername).toHaveBeenCalledOnceWith(component.userProfileCard.username);
    expect(mockDataService.setFollowFlag).toHaveBeenCalledWith(false);
    expect(mockFollowService.unfollow).toHaveBeenCalled();
  });

  it('#unfollow should display error alert if request fails', () => {
    spyOn(window, 'alert');
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.unfollow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.unfollow();
    expect(window.alert).toHaveBeenCalledWith('Unfollowing failed');
    expect(mockFollowService.unfollow).toHaveBeenCalled();
  });

  it('#followList should return expected data and navigate to following list', () => {
    const mockFollowList = new MockFollowList();
    const flag = true;
    const routerSpy = spyOn(router, 'navigate');
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.followList(flag);
    expect(routerSpy).toHaveBeenCalledWith([`${component.userProfileCard.username}/follow/following`]);
  });

  it('#followList should return expected data and navigate to follower list', () => {
    const mockFollowList = new MockFollowList();
    const flag = false;
    const routerSpy = spyOn(router, 'navigate');
    component.userProfileCard = new MockUserProfileCard();
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.followList(flag);
    expect(routerSpy).toHaveBeenCalledWith([`${component.userProfileCard.username}/follow/followers`]);
  });

  it('#openModal should open the profile edit modal', () => {
    const modalCompSpy = jasmine.createSpyObj('ProfileEditModalComponent', ['open']);
    component.modalComponent = modalCompSpy;
    component.openModal();
    expect(modalCompSpy.open).toHaveBeenCalled();
  });
});
