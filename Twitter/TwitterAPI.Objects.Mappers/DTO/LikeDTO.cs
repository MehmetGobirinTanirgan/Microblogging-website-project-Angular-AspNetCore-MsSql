using System;

namespace TwitterAPI.Objects.Mappers.DTO
{
    public class LikeDTO
    {
        public Guid TweetID { get; set; }
        public Guid UserID { get; set; }
    }
}
