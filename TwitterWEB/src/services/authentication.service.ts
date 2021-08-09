import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { LoginModel } from 'src/models/LoginModel';
import { UserStoreModel } from 'src/models/UserStoreModel';
@Injectable()
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject('baseAddress') private baseAddress: string
  ) {}
  userData: UserStoreModel = new UserStoreModel();
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginModel: LoginModel): Observable<UserStoreModel> {
    return this.httpClient
      .post<UserStoreModel>(
        this.baseAddress + 'api/Login/Authentication',
        loginModel
      )
      .pipe(
        tap((response) => {
          this.userData = response;
          this.saveData(this.userData);
          this.decodedToken = this.jwtHelper.decodeToken(this.userData.token);
        })
      );
  }

  saveData(user: UserStoreModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    const user:UserStoreModel = JSON.parse(localStorage.getItem('user')!);
    if(user == null){
      return null;
    }
    return user.token;
  }

  getUserData(): UserStoreModel{
    this.userData = JSON.parse(localStorage.getItem("user")!);
    return this.userData;
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token != null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
