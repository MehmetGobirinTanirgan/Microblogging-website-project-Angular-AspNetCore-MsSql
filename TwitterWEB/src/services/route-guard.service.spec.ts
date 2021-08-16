/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthenticationService } from './authentication.service';
import { RouteGuardService } from './route-guard.service';

describe('Service: RouteGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let service: RouteGuardService;
  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'isLoggedIn',
    ]);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [
        RouteGuardService,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    });
    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    service = TestBed.inject(RouteGuardService);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#canActivate should return true if user logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    const _canActivate = service.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'mockURL' });
    expect(_canActivate).toBeTrue();
  });

  it('#canActivate should return false if user is not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    const _canActivate = service.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'mockURL' });
    expect(_canActivate).toBeFalse();
  });
});
