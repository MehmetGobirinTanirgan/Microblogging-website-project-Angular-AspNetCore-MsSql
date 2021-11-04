import { FollowCardDTO } from './FollowCardDTO';

export class FollowListDTO {
  fullname: string;
  username: string;
  followers: Array<FollowCardDTO>;
  followings: Array<FollowCardDTO>;
}
