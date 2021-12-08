import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../models/SignUp';
import { UserProfile } from '../models/UserProfile';
import { UserProfileCard } from '../models/UserProfileCard';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(signUp: SignUp) {
    return this.httpClient.post('Login/SignUp', signUp);
  }

  getMainUserProfile(username: string) {
    return this.httpClient.get<UserProfile>('Profile/GetMainUserProfile/' + username);
  }

  getForeignUserProfile(username: string, foreignUsername: string) {
    return this.httpClient.get<UserProfile>('Profile/GetForeignUserProfile/' + foreignUsername + '/' + username);
  }

  updateProfile(updatedProfile: FormData) {
    return this.httpClient.put<UserProfileCard>('Profile/UpdateProfile', updatedProfile);
  }
}
