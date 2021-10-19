﻿using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class ForeignUserProfileDTO
    {
        public ForeignUserProfileCardDTO UserProfileCard { get; set; }
        public List<TweetDTO> OwnTweets { get; set; }
        public List<TweetDTO> NonReplyOwnTweets { get; set; }
        public List<TweetDTO> MediaTypeTweets { get; set; }
        public List<TweetDTO> LikedTweets { get; set; }
    }
}
