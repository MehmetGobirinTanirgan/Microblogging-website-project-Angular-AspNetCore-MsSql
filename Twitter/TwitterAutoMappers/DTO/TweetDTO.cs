using System;
using System.Collections.Generic;

namespace TwitterAutoMappers.DTO
{
    public class TweetDTO
    {
        public Guid ID { get; set; }
        public DateTime CreatedDate { get; set; }
        public string TweetDetail { get; set; }
        public List<TweetImageDTO> TweetImageInfos { get; set; }
        public Guid UserID { get; set; }
        public string ProfilePicPath { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public int ReplyCounter { get; set; }
        public int RetweetCounter { get; set; }
        public int LikeCounter { get; set; }
        public bool FollowFlag { get; set; }
        public bool LikeFlag { get; set; }
        public bool OwnershipStatus { get; set; }
        public Guid? MainTweetOwnerID { get; set; }
        public string MainTweetOwnerUsername { get; set; }
    }
}
