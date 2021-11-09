import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDTO } from 'src/dtos/SignUpDTO';
import { UserProfileCardDTO } from 'src/dtos/UserProfileCardDTO';
import { UserProfileDTO } from 'src/dtos/UserProfileDTO';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(signUpDTO: SignUpDTO) {
    return this.httpClient.post('Login/SignUp', signUpDTO);
  }

  getMainUserProfile(username: string) {
    return this.httpClient.get<UserProfileDTO>('Profile/GetMainUserProfile/' + username);
  }

  getForeignUserProfile(username: string, foreignUsername: string) {
    return this.httpClient.get<UserProfileDTO>('Profile/GetForeignUserProfile/' + foreignUsername + '/' + username);
  }

  updateProfile(updatedProfile: FormData) {
    return this.httpClient.put<UserProfileCardDTO>('Profile/UpdateProfile', updatedProfile);
  }
}
