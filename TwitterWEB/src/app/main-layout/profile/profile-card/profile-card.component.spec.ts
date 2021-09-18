import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let router: Router;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
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

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(
      DataService
    ) as jasmine.SpyObj<DataService>;
    mockFollowService = TestBed.inject(
      FollowService
    ) as jasmine.SpyObj<FollowService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should change #userID value',() =>{
    const mockData = new MockData();
    const mockUserData = mockData.mockUserData;
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();

    expect(component.userID).toEqual(mockUserData.id);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if auth. service returns null',() =>{
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#follow should post follow request and display success alert', () => {
    spyOn(window, 'alert');
    const mockData = new MockData();
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.follow.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
    component.follow();

    expect(window.alert).toHaveBeenCalledWith('Following');
    expect(mockFollowService.follow).toHaveBeenCalled();
  });

  it('#follow should fail on request and display fail alert', () => {
    spyOn(window, 'alert');
    const mockData = new MockData();
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.follow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.follow();

    expect(window.alert).toHaveBeenCalledWith('Following failed');
    expect(mockFollowService.follow).toHaveBeenCalled();
  });

  it('#unfollow should post follow request and display success alert', () => {
    spyOn(window, 'alert');
    const mockData = new MockData();
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.unfollow.and.returnValue(
      of(new HttpResponse({ status: 200 }))
    );
    component.unfollow();

    expect(window.alert).toHaveBeenCalledWith('Unfollowed');
    expect(mockFollowService.unfollow).toHaveBeenCalled();
  });

  it('#unfollow should fail on request and display fail alert', () => {
    spyOn(window, 'alert');
    const mockData = new MockData();
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.unfollow.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.unfollow();

    expect(window.alert).toHaveBeenCalledWith('Unfollowing failed');
    expect(mockFollowService.unfollow).toHaveBeenCalled();
  });

  it('#followList should return expected data and navigate to following list', () => {
    const mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    const flag = true;
    const routerSpy = spyOn(router, 'navigate');
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.followList(flag);

    expect(routerSpy).toHaveBeenCalledWith([
      `${component.userProfileCard.id}/following`,
    ]);
  });

  it('#followList should return expected data and navigate to follower list', () => {
    const mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    const flag = false;
    const routerSpy = spyOn(router, 'navigate');
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.followList(flag);

    expect(routerSpy).toHaveBeenCalledWith([
      `${component.userProfileCard.id}/followers`,
    ]);
  });

  it('#followList should display alert', () => {
    spyOn(window, 'alert');
    const mockData = new MockData();
    component.userProfileCard = mockData.mockUserProfileCard;
    mockFollowService.getFollowList.and.returnValue(
      throwError(new HttpResponse({ status: 400 }))
    );
    component.followList(true);

    expect(window.alert).toHaveBeenCalledWith("Can't load follow list");
  });

  it('#openModal should open modal', () => {
    const modalCompSpy = jasmine.createSpyObj('ProfileEditModalComponent',['open']);
    component.modalComponent = modalCompSpy;
    component.openModal();

    expect(modalCompSpy.open).toHaveBeenCalled();
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

  mockUserProfileCard = {
    id: 'mockID',
    createdDate: new Date(),
    fullname: 'mockFullname',
    username: 'mockUsername',
    personalInfo: 'mockPersonalInfo',
    location: 'mockLocation',
    personalWebSiteURL: 'mockPersonalWebSiteURL',
    profilePicPath: 'mockProfilePicPath',
    backgroundPath: 'mockBackgroundPath',
    followerCounter: 1,
    followingCounter: 1,
    followFlag: true,
  };

  mockFollowList = {
    fullname: 'mockFullname',
    username: 'mockUsername',
    followers: [
      {
        id: '1',
        fullname: 'mockFullname',
        username: 'mockUsername',
        profilePicPath: 'mockProfilePicPath',
      },
    ],
    followings: [
      {
        id: '1',
        fullname: 'mockFullname',
        username: 'mockUsername',
        profilePicPath: 'mockProfilePicPath',
      },
    ],
  };
}
