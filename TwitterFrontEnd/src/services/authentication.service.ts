import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { LoginDTO } from 'src/dtos/LoginDTO';
import { UserInfoDTO } from 'src/dtos/UserInfoDTO';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
  authenticatedUserInfos: UserInfoDTO;
  jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginDTO: LoginDTO) {
    this.logOut();
    return this.httpClient.post<UserInfoDTO>('Login/Authentication', loginDTO).pipe(
      tap((response) => {
        this.authenticatedUserInfos = response;
        this.saveUserInfos(this.authenticatedUserInfos);
      })
    );
  }

  saveUserInfos(userInfo: UserInfoDTO) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getAuthenticationToken(): string | null {
    const userInfo: UserInfoDTO = JSON.parse(localStorage.getItem('userInfo')!);
    if (userInfo == null) {
      return null;
    }
    return userInfo.token;
  }

  getAuthenticatedUserInfos(): UserInfoDTO | null {
    const userInfo: UserInfoDTO = JSON.parse(localStorage.getItem('userInfo')!);
    return userInfo ?? null;
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getAuthenticationToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
