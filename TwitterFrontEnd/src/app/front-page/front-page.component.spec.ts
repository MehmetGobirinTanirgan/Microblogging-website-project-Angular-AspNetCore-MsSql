import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { ValidatorService } from '../core/services/validator.service';
import { FrontPageComponent } from './front-page.component';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;
  let router: Router;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockNgbModal: jasmine.SpyObj<NgbModal>;
  let mockValidatorService: jasmine.SpyObj<ValidatorService>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['signUp']);
    const ngbModalSpyObj = jasmine.createSpyObj('NgbModal', ['open']);
    const validatorServiceSpyObj = jasmine.createSpyObj('ValidatorService', ['atLeastOne']);

    await TestBed.configureTestingModule({
      declarations: [FrontPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: NgbModal, useValue: ngbModalSpyObj },
        { provide: ValidatorService, useValue: validatorServiceSpyObj },
      ],
    })
      .overrideProvider(UserService, { useValue: userServiceSpyObj })
      .compileComponents();

    router = TestBed.inject(Router);
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mockNgbModal = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    mockValidatorService = TestBed.inject(ValidatorService) as jasmine.SpyObj<ValidatorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call sign-up form creation', () => {
    const formSpy = spyOn(component, 'createSignUpForm');
    formSpy.and.callThrough();
    fixture.detectChanges();
    expect(formSpy).toHaveBeenCalledTimes(1);
  });

  it('#ngOnInit checking #isLeapYear value', () => {
    const checkYearSpy = spyOn(component, 'checkYear');
    checkYearSpy.and.callThrough();
    component.currentYear = 2021;
    fixture.detectChanges();
    expect(component.isLeapYear).toBeFalse();
    expect(checkYearSpy).toHaveBeenCalledTimes(1);
  });

  it('#createSignUpForm checking form creation', () => {
    const formSpy = spyOn(component, 'createSignUpForm');
    formSpy.and.callThrough();
    component.createSignUpForm();
    const signUpFormValues = {
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      day: '',
      month: '',
      year: '',
      password: '',
    };
    expect(component.signUpForm.value).toEqual(signUpFormValues);
    expect(formSpy).toHaveBeenCalledTimes(1);
  });

  it('#signUp should navigate to login page when sign up process is successfull', () => {
    component.createSignUpForm();
    mockUserService.signUp.and.returnValue(of(new HttpResponse({ status: 200 })));
    const routerSpy = spyOn(router, 'navigate');
    const signUpForm = component.signUpForm;
    signUpForm.controls.fullName.setValue('mockFullname');
    signUpForm.controls.emailAddress.setValue('mock@gmail.com');
    signUpForm.controls.phoneNumber.setValue('');
    signUpForm.controls.day.setValue(1);
    signUpForm.controls.month.setValue(1);
    signUpForm.controls.year.setValue(1);
    signUpForm.controls.password.setValue('12345');
    component.signUp();
    expect(signUpForm.valid).toBeTrue();
    expect(mockUserService.signUp).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('#signUp should display alert when sign up process fails', () => {
    component.createSignUpForm();
    mockUserService.signUp.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    spyOn(window, 'alert');
    const signUpForm = component.signUpForm;
    signUpForm.controls.fullName.setValue('mockFullname');
    signUpForm.controls.emailAddress.setValue('mock@gmail.com');
    signUpForm.controls.phoneNumber.setValue('');
    signUpForm.controls.day.setValue(1);
    signUpForm.controls.month.setValue(1);
    signUpForm.controls.year.setValue(1);
    signUpForm.controls.password.setValue('12345');
    component.signUp();
    expect(signUpForm.valid).toBeTrue();
    expect(mockUserService.signUp).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Signup failed');
  });

  it('#openModal should call and open the signup form modal', () => {
    component.openModal();
    expect(mockNgbModal.open).toHaveBeenCalledWith(component.signupModal, { centered: true });
  });

  it('#checkMonth should change the #days', () => {
    component.checkMonth('0');
    expect(component.days).toEqual(new Array(31));
    component.isLeapYear = true;
    component.checkMonth('1');
    expect(component.days).toEqual(new Array(29));
    component.isLeapYear = false;
    component.checkMonth('1');
    expect(component.days).toEqual(new Array(28));
    component.checkMonth('3');
    expect(component.days).toEqual(new Array(30));
  });

  it('#checkYear should change the #isLeapYear', () => {
    component.checkYear(2020);
    expect(component.isLeapYear).toBeTrue();
    component.checkYear(2021);
    expect(component.isLeapYear).toBeFalse();
  });
});
