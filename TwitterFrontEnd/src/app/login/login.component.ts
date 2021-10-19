import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/models/LoginModel';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  loginForm: FormGroup;
  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      usernameOrPhoneOrEmail: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  login(){
    if(this.loginForm.valid){
      const loginModel = new LoginModel(this.loginForm.value);
      this.authService.login(loginModel).subscribe(success =>
        {
          this.router.navigate(["home"]);
        },error =>{
          alert("Login failed");
        });
    }
  }
}
