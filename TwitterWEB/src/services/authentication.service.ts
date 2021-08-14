import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { LoginModel } from 'src/models/LoginModel';
import { UserStoreModel } from 'src/models/UserStoreModel';
@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
  userData: UserStoreModel = new UserStoreModel();
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  login(loginModel: LoginModel) {
    this.logOut();
    return this.httpClient
      .post<UserStoreModel>('Login/Authentication', loginModel)
      .pipe(
        tap((response) => {
          this.userData = response;
          this.saveData(this.userData);
        })
      );
  }

  saveData(user: UserStoreModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    const user: UserStoreModel = JSON.parse(localStorage.getItem('user')!);
    if (user == null) {
      return null;
    }
    return user.token;
  }

  getUserData(): UserStoreModel | null {
    const userData: UserStoreModel = JSON.parse(localStorage.getItem('user')!);
    if (userData == null) {
      return null;
    }
    return userData;
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token !== null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
