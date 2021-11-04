import { TweetDisplayDTO } from './TweetDisplayDTO';
import { UserProfileCardDTO } from './UserProfileCardDTO';

export class UserProfileDTO {
  userProfileCard: UserProfileCardDTO;
  tweetsAndReplies: Array<TweetDisplayDTO>;
  tweets: Array<TweetDisplayDTO>;
  media: Array<TweetDisplayDTO>;
  likes: Array<TweetDisplayDTO>;
}
