import { UserProfile } from '../models/UserProfile';
import { MockTweetDisplay } from './MockTweetDisplay';
import { MockUserProfileCard } from './MockUserProfileCard';

export class MockUserProfile extends UserProfile {
  super() {
    this.userProfileCard = new MockUserProfileCard();
    this.tweets.push(new MockTweetDisplay());
    this.tweetsAndReplies.push(new MockTweetDisplay());
    this.media.push(new MockTweetDisplay());
    this.likes.push(new MockTweetDisplay());
  }
  userProfileCard: MockUserProfileCard;
  tweets: Array<MockTweetDisplay>;
  tweetsAndReplies: Array<MockTweetDisplay>;
  media: Array<MockTweetDisplay>;
  likes: Array<MockTweetDisplay>;
}
