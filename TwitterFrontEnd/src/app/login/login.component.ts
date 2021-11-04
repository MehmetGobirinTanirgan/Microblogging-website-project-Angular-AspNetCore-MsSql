import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/dtos/LoginDTO';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';

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
  ) {}

  loginForm: FormGroup;
  loadingFlag: boolean = false;

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
      this.authService.login(new LoginDTO(this.loginForm.value)).subscribe(
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
