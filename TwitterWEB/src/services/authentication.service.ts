import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap,map, catchError } from 'rxjs/operators';
import { LoginModel } from 'src/models/LoginModel';
import { UserStoreModel } from 'src/models/UserStoreModel';
@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router,@Inject("baseAddress") private baseAddress: string) {}
  userData:UserStoreModel = new UserStoreModel();
  decodedToken: any;
  jwtHelper:JwtHelperService = new JwtHelperService();

  login(loginModel: LoginModel):Observable<UserStoreModel>{
    return this.httpClient
      .post<UserStoreModel>(
        this.baseAddress + 'api/Login/Authentication',
        loginModel
      ).pipe(tap(response => {
        this.userData = response;
        console.log(this.userData);
        this.saveData(this.userData);
        this.decodedToken = this.jwtHelper.decodeToken(this.userData.token);
      }))
  }

  saveData(user: UserStoreModel) {
    localStorage.setItem("id",user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('fullname',user.fullname);
    localStorage.setItem('username',user.username);
    localStorage.setItem('userpic',user.profilePicPath);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserData():UserStoreModel{
    this.userData.username = localStorage.getItem('username')!;
    this.userData.fullname = localStorage.getItem('fullname')!;
    this.userData.profilePicPath = localStorage.getItem('userpic')!;
    return this.userData;
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn():boolean {
    return this.jwtHelper.isTokenExpired(this.userData.token);
  }
}
