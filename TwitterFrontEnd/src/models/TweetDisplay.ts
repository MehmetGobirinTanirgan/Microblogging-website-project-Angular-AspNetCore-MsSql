import { TweetImage } from './TweetImage';

export class TweetDisplay {
  id: string;
  createdDate: Date;
  tweetDetail: string;
  tweetImageInfos: Array<TweetImage>;
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
