using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class ForeignUserProfileDTO
    {
        public ForeignUserProfileCardDTO UserProfileCard { get; set; }
        public List<TweetDisplayDTO> Tweets { get; set; }
        public List<TweetDisplayDTO> TweetsAndReplies { get; set; }
        public List<TweetDisplayDTO> Media { get; set; }
        public List<TweetDisplayDTO> Likes { get; set; }
    }
}
