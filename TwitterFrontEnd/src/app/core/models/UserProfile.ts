import { TweetDisplay } from "./TweetDisplay";
import { UserProfileCard } from "./UserProfileCard";

export class UserProfile {
  userProfileCard: UserProfileCard;
  tweetsAndReplies: Array<TweetDisplay>;
  tweets: Array<TweetDisplay>;
  media: Array<TweetDisplay>;
  likes: Array<TweetDisplay>;
}
