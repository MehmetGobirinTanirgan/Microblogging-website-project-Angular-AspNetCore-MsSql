import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/services/authentication.service';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    }).compileComponents();
    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should change id`s value if auth. service gets data correctly', () => {
    const mockUserData = {
      username: 'mockUsername',
      fullname: 'mockFullname',
      id: 'mockID',
      profilePicPath: 'mockProfilePicPath',
      token: 'mockToken',
    };
    mockAuthService.getUserData.and.returnValue(mockUserData);
    fixture.detectChanges();

    expect(component.id).toEqual(mockUserData.id);
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });

  it('#ngOnInit should display alert if auth. service gets null', () => {
    mockAuthService.getUserData.and.returnValue(null);
    spyOn(window, 'alert');
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Local storage error');
    expect(mockAuthService.getUserData).toHaveBeenCalled();
  });
});
