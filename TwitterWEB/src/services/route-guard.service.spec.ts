/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { RouteGuardService } from './route-guard.service';

describe('Service: RouteGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'isLoggedIn',
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouteGuardService,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    });
    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  it('should ...', inject([RouteGuardService], (service: RouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
