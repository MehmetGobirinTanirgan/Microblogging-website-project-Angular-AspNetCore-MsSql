import { ForeignUserProfileCardModel } from "./ForeignUserProfileCardModel";
import { TweetModel } from "./TweetModel";

export class ForeignUserProfileModel {
foreignUserProfileCard:ForeignUserProfileCardModel;
ownTweets:TweetModel[];
nonReplyOwnTweets:TweetModel[];
mediaTypeTweets:TweetModel[];
likedTweets:TweetModel[];
}
