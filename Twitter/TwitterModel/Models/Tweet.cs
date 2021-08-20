using System;
using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;
using TwitterCore.Entities.Enums;

namespace TwitterModel.Models
{
    public class Tweet : ComplexEntity
    {
        public string TweetDetail { get; set; }
        public int LikeCounter { get; set; }
        public int RetweetCounter { get; set; }
        public int ReplyCounter { get; set; }
        public TweetReplyStatus ReplyStatus { get; set; }
        public Guid UserID { get; set; }
        public virtual User User { get; set; }
        public Guid? ReplyMainTweetID { get; set; }
        public virtual Tweet ReplyMainTweet { get; set; }
        public Guid? RetweetMainTweetID { get; set; }
        public virtual Tweet RetweetMainTweet { get; set; }
        public Guid? TopicID { get; set; }
        public virtual Topic Topic { get; set; }
        public bool FollowFlag { get; set; }
        public bool LikeFlag { get; set; }
        public bool OwnershipStatus { get; set; }
        public virtual List<TweetImage> ImagesOfTweet { get; set; }
        public virtual List<TweetHashTag> HashtagsOfTweet { get; set; }
        public virtual List<TweetMention> Mentions { get; set; }
        public virtual List<Like> UsersWhoLiked { get; set; }
        public virtual List<Tweet> ReplyTweets { get; set; }
        public virtual List<Tweet> Retweets { get; set; }

        public override bool Equals(object obj)
        {
            var theOther = obj as Tweet;
            if (theOther == null)
            {
                return false;
            }

            return ID == theOther.ID && UserID == theOther.UserID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, UserID);
        }
    }
}
