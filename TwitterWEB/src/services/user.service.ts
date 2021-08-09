import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignUpModel } from 'src/models/SignUpModel';



@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, @Inject("baseAddress") private baseAddress:string) {}

  signUp(signUpModel: SignUpModel) {
    return this.httpClient.post(this.baseAddress + "api/Login/SignUp",signUpModel);
  }
}
