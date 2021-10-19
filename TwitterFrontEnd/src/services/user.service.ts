import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from 'src/models/SignUpModel';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { UserProfileModel } from 'src/models/UserProfileModel';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(signUpModel: SignUpModel) {
    return this.httpClient.post('Login/SignUp', signUpModel, {
      observe: 'response',
    });
  }

  getUserProfile(userID: string) {
    return this.httpClient.get<UserProfileModel>(
      'Profile/GetUserProfile/' + userID
    );
  }

  getForeignUserProfile(userID: string, foreignUserID: string) {
    return this.httpClient.get<UserProfileModel>(
      'Profile/GetForeignUserProfile/' + foreignUserID + '/' + userID
    );
  }

  updateProfile(updatedProfile: FormData) {
    return this.httpClient.put<UserProfileCardModel>(
      'Profile/UpdateProfile',
      updatedProfile,
      { observe: 'response' }
    );
  }
}