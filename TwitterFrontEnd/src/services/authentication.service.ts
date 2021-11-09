import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { LoginDTO } from 'src/dtos/LoginDTO';
import { UserInfoDTO } from 'src/dtos/UserInfoDTO';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginDTO: LoginDTO) {
    return this.httpClient.post<UserInfoDTO>('Login/Authentication', loginDTO).pipe(
      tap((response) => {
        this.saveUserInfos(response);
      })
    );
  }

  saveUserInfos(userInfo: UserInfoDTO) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getAuthenticatedUserInfos(): UserInfoDTO | null {
    const userInfoJson = localStorage.getItem('userInfo');
    if (userInfoJson != null) {
      const userInfo: UserInfoDTO = JSON.parse(userInfoJson);
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
