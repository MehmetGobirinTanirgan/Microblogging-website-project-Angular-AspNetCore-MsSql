export class LikeCreationDTO {
  constructor(tweetID: string, username: string) {
    this.tweetID = tweetID;
    this.username = username;
  }
  tweetID: string;
  username: string;
}
