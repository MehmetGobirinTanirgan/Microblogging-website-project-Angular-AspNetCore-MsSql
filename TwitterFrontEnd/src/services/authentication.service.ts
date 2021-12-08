import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Login } from 'src/models/Login';
import { UserInfo } from 'src/models/UserInfo';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginDTO: Login) {
    return this.httpClient.post<UserInfo>('Login/Authentication', loginDTO).pipe(
      tap((response) => {
        this.saveUserInfos(response);
      })
    );
  }

  saveUserInfos(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getAuthenticatedUserInfos(): UserInfo | null {
    const userInfoJson = localStorage.getItem('userInfo');
    if (userInfoJson != null) {
      const userInfo: UserInfo = JSON.parse(userInfoJson);
      return userInfo;
    }
    this.logOut();
    return null;
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getAuthenticatedUserInfos()?.token;
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
