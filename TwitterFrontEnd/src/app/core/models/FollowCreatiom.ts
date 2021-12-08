export class FollowCreation{
  constructor(followerUsername: string, followingUsername: string) {
    this.followerUsername = followerUsername;
    this.followingUsername = followingUsername;
  }
  followerUsername: string;
  followingUsername: string;
}
