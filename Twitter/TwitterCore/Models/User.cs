using System;
using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Models
{
    public class User : ComplexEntity
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string PersonalInfo { get; set; }
        public string Location { get; set; }
        public string PersonalWebSiteURL { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public DateTime Birthday { get; set; }
        public string ProfilePicPath { get; set; }
        public string BackgroundPath { get; set; }
        public int FollowerCounter { get; set; }
        public int FollowingCounter { get; set; }
        public bool FollowFlag { get; set; }
        public virtual List<Tweet> Tweets { get; set; }
        public virtual List<Like> LikedTweets { get; set; }
        public virtual List<TweetMention> MentionedTweets { get; set; }
        public virtual List<Follow> Followings { get; set; }
        public virtual List<Follow> Followers { get; set; }
    }
}
