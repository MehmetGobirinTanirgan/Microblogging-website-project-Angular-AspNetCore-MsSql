import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MockUserInfo } from 'src/app/core/test-objects/MockUserInfo';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);

    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [{ provide: AuthenticationService, useValue: authServiceSpyObj }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should effect username value if #getAuthenticatedUserInfos returns user`s infos', () => {
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    fixture.detectChanges();
    expect(component.username).toEqual(mockUserInfo.username);
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if #getAuthenticatedUserInfos returns null', () => {
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    spyOn(window, 'alert');
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getAuthenticatedUserInfos).toHaveBeenCalled();
  });
});
