import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos', 'logOut']);

    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthenticationService, useValue: authServiceSpyObj }],
    }).compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should get userInfo from #getAuthenticatedUserInfos', () => {
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    fixture.detectChanges();
    expect(component.userInfo).toEqual(mockUserInfo);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if #getAuthenticatedUserInfos returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#logOut should navigato to front page', () => {
    mockAuthService.logOut.and.callThrough();
    const routerSpy = spyOn(router, 'navigate');
    component.logOut();
    expect(routerSpy).toHaveBeenCalledWith(['']);
    expect(mockAuthService.logOut).toHaveBeenCalled();
  });
});
