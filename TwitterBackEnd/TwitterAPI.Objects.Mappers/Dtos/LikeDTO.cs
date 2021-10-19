using System;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class LikeDTO
    {
        public Guid TweetID { get; set; }
        public Guid UserID { get; set; }
    }
}
