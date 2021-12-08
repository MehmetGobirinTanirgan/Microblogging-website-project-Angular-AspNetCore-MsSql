import { UserInfo } from "../models/UserInfo";

export class MockUserInfo extends UserInfo {
  username: string = 'mockUsername';
  fullname: string = 'mockFullname';
  profilePicPath: string = 'mockProfilePicPath';
  token: string = 'mockToken';
}
