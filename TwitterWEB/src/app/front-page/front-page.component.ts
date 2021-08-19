import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpModel } from 'src/models/SignUpModel';
import { UserService } from 'src/services/user.service';

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
    private router: Router
  ) {}
  @ViewChild('signupModal') signupModal: any;
  days = new Array(31);
  currentYear = new Date().getFullYear();
  years = new Array(this.currentYear - 1969);
  months: string[] = [
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
  isLeapYear: boolean;
  selectedMonth: string;
  signUpForm: FormGroup;

  ngOnInit() {
    this.createSignUpForm();
    this.checkYear(this.currentYear);
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      emailAddress: ['', [Validators.maxLength(50), Validators.email]],
      phoneNumber: ['', Validators.maxLength(20)],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const signUpModel = new SignUpModel(this.signUpForm.value);
      this.userService.signUp(signUpModel).subscribe(
        (success) => {
          this.router.navigate(['login']);
        },
        (error) => {
          alert('Signup failed');
        }
      );
    }else{
      alert('Form is invalid');
    }
  }

  openModal() {
    this.ngbModal.open(this.signupModal, { centered: true });
  }

  checkMonth(month: string) {
    this.selectedMonth = month;
    if (
      month === '0' ||
      month === '2' ||
      month === '4' ||
      month === '6' ||
      month === '7' ||
      month === '9' ||
      month === '11'
    ) {
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
}
