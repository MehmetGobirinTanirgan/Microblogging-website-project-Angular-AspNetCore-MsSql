import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/services/authentication.service';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
      'logOut',
    ]);
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    }).compileComponents();
    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should change #userData`s value if authentication service gets user`s data correctly', () => {
    const mockUserData = {
      username: 'mockUsername',
      fullname: 'mockFullname',
      id: 'mockID',
      profilePicPath: 'mockProfilePicPath',
      token: 'mockToken',
    };
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();

    expect(component.userData).toEqual(mockUserData);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if authentication service gets null data', () => {
    const mockUserData = {
      username: 'mockUsername',
      fullname: 'mockFullname',
      id: 'mockID',
      profilePicPath: 'mockProfilePicPath',
      token: 'mockToken',
    };
    spyOn(window, 'alert');
    mockAuthService.getUserData.and.returnValue(null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#logOut should navigato to front page', () => {
    mockAuthService.logOut.and.callThrough();
    const routerSpy = spyOn(router, 'navigate');
    component.logOut();

    expect(routerSpy).toHaveBeenCalledWith(['']);
    expect(mockAuthService.logOut).toHaveBeenCalled();
  });
});
