import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignUpModel } from 'src/models/SignUpModel';
import { UserProfileModel } from 'src/models/UserProfileModel';

@Injectable()
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseAddress') private baseAddress: string
  ) {}

  signUp(signUpModel: SignUpModel) {
    return this.httpClient.post(
      this.baseAddress + 'api/Login/SignUp',
      signUpModel
    );
  }

  getUserProfile(userID: string) {
    return this.httpClient.get<UserProfileModel>(
      this.baseAddress + 'api/Profile/GetUserProfile/' + userID
    );
  }

  getForeignUserProfile(userID: string, foreignUserID: string) {
    return this.httpClient.get<UserProfileModel>(
      this.baseAddress +
        'api/Profile/GetForeignUserProfile/' +
        foreignUserID +
        '/' +
        userID
    );
  }

  updateProfile(updatedProfile: FormData) {
    let HttpOptions: Object = {
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
      }),
      responseType: 'text' as 'json',
    };

    return this.httpClient.put(
      this.baseAddress + 'api/Profile/UpdateProfile',
      updatedProfile,
      HttpOptions
    );
  }
}
