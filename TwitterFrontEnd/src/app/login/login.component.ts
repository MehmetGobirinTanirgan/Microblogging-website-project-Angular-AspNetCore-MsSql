import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../core/models/Login';
import { AuthenticationService } from '../core/services/authentication.service';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private dataService: DataService
  ) {
    this.loadingFlag = false;
  }

  loginForm: FormGroup;
  loadingFlag: boolean;

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      usernameOrPhoneOrEmail: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.dataService.setLoadingFlag(true);
      this.authService.login(new Login(this.loginForm.value)).subscribe(
        (success) => {
          this.dataService.setLoadingFlag(false);
          this.router.navigate(['home']);
        },
        (error) => {
          this.dataService.setLoadingFlag(false);
          alert('Login failed');
        }
      );
    }
  }
}
