import { UserProfileCard } from "../models/UserProfileCard";

export class MockUserProfileCard extends UserProfileCard {
  super() {
    this.createdDate = new Date();
  }
  createdDate: Date;
  fullname: string = 'mockFullname';
  username: string = 'mockUsername';
  personalInfo: string = 'mockPersonalInfo';
  location: string = 'mockLocation';
  personalWebSiteURL: string = 'mockPersonalWebSiteURL';
  profilePicPath: string = 'mockProfilePicPath';
  backgroundPath: string = 'mockBackgroundPath';
  followerCounter: number = 1;
  followingCounter: number = 1;
  followFlag: boolean = true;
}
