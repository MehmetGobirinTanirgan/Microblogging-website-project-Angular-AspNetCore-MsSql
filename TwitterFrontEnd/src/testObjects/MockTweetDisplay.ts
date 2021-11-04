import { TweetDisplayDTO } from 'src/dtos/TweetDisplayDTO';
import { MockTweetImage } from './MockTweetImage';

export class MockTweetDisplay extends TweetDisplayDTO {
  super() {
    this.createdDate = new Date();
    this.tweetImageInfos.push(new MockTweetImage(), new MockTweetImage());
  }
  id: string = 'mockTweetID';
  createdDate: Date;
  tweetDetail: string = 'mockTweetDetail';
  tweetImageInfos: Array<MockTweetImage>;
  profilePicPath: string = 'mockProfilePicPath';
  fullname: string = 'mockFullname';
  username: string = 'mockUsername';
  replyCounter: number = 0;
  retweetCounter: number = 0;
  likeCounter: number = 0;
  followFlag: boolean = false;
  likeFlag: boolean = true;
  ownershipStatus: boolean = true;
  mainTweetOwnerUsername: null;
  tweetFlag: boolean = true;
}
