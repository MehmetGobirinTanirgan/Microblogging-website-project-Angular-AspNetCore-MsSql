import { FollowCardModel } from "./FollowCardModel";

export class FollowListModel {
  fullname:string;
  username:string;
  followers :FollowCardModel[];
  followings:FollowCardModel[];
}
