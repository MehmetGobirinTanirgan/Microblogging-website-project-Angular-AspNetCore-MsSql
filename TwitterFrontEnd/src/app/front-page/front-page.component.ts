import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUp } from '../core/models/SignUp';
import { UserService } from '../core/services/user.service';
import { ValidatorService } from '../core/services/validator.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
  providers: [UserService],
})
export class FrontPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal,
    private router: Router,
    private validatorService: ValidatorService
  ) {
    this.days = new Array(31);
    this.currentYear = new Date().getFullYear();
    this.years = new Array(this.currentYear - 1969);
    this.months = [
      'January',
      'February',
      'March',
      'April ',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.emailOrPhoneFlag = true;
  }

  @ViewChild('signupModal') signupModal: any;
  days: Array<number>;
  currentYear: number;
  years: Array<number>;
  months: Array<string>;
  isLeapYear: boolean;
  selectedMonth: string;
  signUpForm: FormGroup;
  emailOrPhoneFlag: boolean;

  ngOnInit() {
    this.createSignUpForm();
    this.checkYear(this.currentYear);
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.maxLength(50)]],
        emailAddress: ['', [Validators.maxLength(50), Validators.email]],
        phoneNumber: ['', Validators.maxLength(20)],
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
        password: ['', [Validators.required, Validators.maxLength(20)]],
      },
      {
        validator: this.validatorService.atLeastOne(Validators.required, ['emailAddress', 'phoneNumber']),
      }
    );
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.userService.signUp(new SignUp(this.signUpForm.value)).subscribe(
        (success) => {
          this.router.navigate(['login']);
        },
        (error) => {
          alert('Signup failed');
        }
      );
    }
  }

  openModal() {
    this.ngbModal.open(this.signupModal, { centered: true });
  }

  checkMonth(month: string) {
    this.selectedMonth = month;
    if (month === '0' || month === '2' || month === '4' || month === '6' || month === '7' || month === '9' || month === '11') {
      this.days = new Array(31);
    } else if (month === '1') {
      if (this.isLeapYear) {
        this.days = new Array(29);
      } else {
        this.days = new Array(28);
      }
    } else {
      this.days = new Array(30);
    }
  }

  checkYear(year: number) {
    this.isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    this.checkMonth(this.selectedMonth);
  }

  switchToPhoneOrEmail() {
    this.emailOrPhoneFlag = !this.emailOrPhoneFlag;
    if (this.emailOrPhoneFlag) {
      this.signUpForm.get('phoneNumber')?.reset();
    } else {
      this.signUpForm.get('emailAddress')?.reset();
    }
  }
}
