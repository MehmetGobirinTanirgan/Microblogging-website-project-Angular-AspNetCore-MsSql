import { TweetImageDTO } from 'src/dtos/TweetImageDTO';

export class ReplyModalModel {
  constructor(
    mainTweetCreatedDate: Date,
    mainTweetDetail: string,
    mainTweetID: string,
    mainTweetImageInfos: Array<TweetImageDTO>,
    mainTweetFullname: string,
    mainTweetUsername: string,
    replyTweetUserProfilePicPath: string,
    mainTweetUserProfilePicPath: string,
    username: string
  ) {
    this.mainTweetCreatedDate = mainTweetCreatedDate;
    this.mainTweetDetail = mainTweetDetail;
    this.mainTweetID = mainTweetID;
    mainTweetImageInfos.forEach((x) => this.mainTweetImagePaths.push(x.imagePath));
    this.mainTweetFullname = mainTweetFullname;
    this.mainTweetUsername = mainTweetUsername;
    this.replyTweetUserProfilePicPath = replyTweetUserProfilePicPath;
    this.mainTweetUserProfilePicPath = mainTweetUserProfilePicPath;
    this.username = username;
  }
  mainTweetID: string;
  mainTweetUserProfilePicPath: string;
  mainTweetFullname: string;
  mainTweetUsername: string;
  mainTweetCreatedDate: Date;
  mainTweetDetail: string;
  mainTweetImagePaths: Array<string> = [];
  replyTweetUserProfilePicPath: string;
  username: string;
}
