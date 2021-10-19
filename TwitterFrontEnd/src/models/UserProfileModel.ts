import { TweetModel } from "./TweetModel";
import { UserProfileCardModel } from "./UserProfileCardModel";

export class UserProfileModel {
userProfileCard:UserProfileCardModel;
ownTweets:TweetModel[];
nonReplyOwnTweets:TweetModel[];
mediaTypeTweets:TweetModel[];
likedTweets:TweetModel[];
}
