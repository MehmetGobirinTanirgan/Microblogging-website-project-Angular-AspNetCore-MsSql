import { UserInfoDTO } from 'src/dtos/UserInfoDTO';

export class MockUserInfo extends UserInfoDTO {
  username: string = 'mockUsername';
  fullname: string = 'mockFullname';
  profilePicPath: string = 'mockProfilePicPath';
  token: string = 'mockToken';
}
