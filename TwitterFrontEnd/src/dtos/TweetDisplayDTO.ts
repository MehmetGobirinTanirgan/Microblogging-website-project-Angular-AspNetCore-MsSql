import { TweetImageDTO } from './TweetImageDTO';

export class TweetDisplayDTO {
  id: string;
  createdDate: Date;
  tweetDetail: string;
  tweetImageInfos: Array<TweetImageDTO>;
  profilePicPath: string;
  fullname: string;
  username: string;
  replyCounter: number;
  retweetCounter: number;
  likeCounter: number;
  followFlag: boolean;
  likeFlag: boolean;
  ownershipStatus: boolean;
  mainTweetOwnerUsername: string | null;
  tweetFlag: boolean;
}
