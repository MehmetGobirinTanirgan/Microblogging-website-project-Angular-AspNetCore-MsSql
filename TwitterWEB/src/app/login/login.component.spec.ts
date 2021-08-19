import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'login',
    ]);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    }).compileComponents();
    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call form creation', () => {
    const formSpy = spyOn(component,'createLoginForm');
    formSpy.and.callThrough();
    fixture.detectChanges();
    expect(formSpy).toHaveBeenCalled();
  });

  it('#createLoginForm checking form creation', () => {
    const formSpy = spyOn(component,'createLoginForm');
    formSpy.and.callThrough();
    component.createLoginForm();
    const loginFormValues = {
      usernameOrPhoneOrEmail: '',
      password: ''
    };

    expect(component.loginForm.value).toEqual(loginFormValues);
    expect(formSpy).toHaveBeenCalled();
  });

  it('#login should navigate to home correctly when login process is successfull', () => {
    component.createLoginForm();
    mockAuthService.login.and.returnValue(
      of({
        username:'mockUsername',
        fullname:'mockFullname',
        id: 'mockID',
        profilePicPath: 'mockProfilePicPath',
        token: 'mockToken'
      })
    );

    const routerSpy = spyOn(router, 'navigate');
    const loginForm = component.loginForm;
    loginForm.controls.usernameOrPhoneOrEmail.setValue('mockg@gmail.com');
    loginForm.controls.password.setValue('12345');
    component.login();
    expect(loginForm.valid).toBeTrue();
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  it('#login should display error alert when login fails', () => {
    component.createLoginForm();
    spyOn(window, 'alert');
    mockAuthService.login.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    const loginForm = component.loginForm;
    loginForm.controls.usernameOrPhoneOrEmail.setValue('mockg@gmail.com');
    loginForm.controls.password.setValue('12345');
    component.login();
    expect(loginForm.valid).toBeTrue();
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login failed');
  });

  it('#login should display error alert when form is not valid', () => {
    component.createLoginForm();
    spyOn(window, 'alert');
    const loginForm = component.loginForm;
    component.login();
    expect(loginForm.valid).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Form is invalid');
  });
});
