import { TweetImageModel } from "./TweetImageModel";

export class TweetModel {
  id:string;
  createdDate:Date;
  tweetDetail:string;
  tweetImageInfos:TweetImageModel[];
  userID:string;
  profilePicPath:string;
  fullname:string;
  username:string;
  replyCounter:number;
  retweetCounter:number;
  likeCounter:number;
  followFlag:boolean;
  likeFlag:boolean;
  ownershipStatus: boolean;
  mainTweetOwnerID:string | null;
  mainTweetOwnerUsername: string | null;
  tweetFlag:boolean;
}
