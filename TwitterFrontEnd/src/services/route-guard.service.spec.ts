/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { RouteGuardService } from './route-guard.service';

describe('Service: RouteGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let service: RouteGuardService;
  let router:Router;
  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'isLoggedIn',
    ]);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
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
    router = TestBed.inject(Router);
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
    const routerSpy = spyOn(router,'navigate');
    mockAuthService.isLoggedIn.and.returnValue(false);
    const _canActivate = service.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'mockURL' });
    expect(routerSpy).toHaveBeenCalledWith(['']);
    expect(_canActivate).toBeFalse();
  });
});
