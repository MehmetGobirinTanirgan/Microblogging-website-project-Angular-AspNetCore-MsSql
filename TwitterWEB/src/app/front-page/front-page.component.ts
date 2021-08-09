import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpModel } from 'src/models/SignUpModel';
import { CustomValidatorService } from 'src/services/customValidator.service';
import { ModalService } from 'src/services/modal.service';
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
    private customValidatorService: CustomValidatorService,
    private modalService: ModalService,
    private router: Router
  ) {}

  days = new Array(31);
  years = new Array(100);
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
  signUpForm: FormGroup;
  signUpModel: SignUpModel = new SignUpModel();

  ngOnInit() {
    this.createSignUpForm();
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
      this.signUpModel = Object.assign({}, this.signUpForm.value);
      this.userService.signUp(this.signUpModel).subscribe(success => {
        this.router.navigate(['login']);
      },error =>{
        alert("Signup failed")
      });
    }
  }

  openModal(signupModal: any) {
    this.modalService.openModal(signupModal);
  }
}
