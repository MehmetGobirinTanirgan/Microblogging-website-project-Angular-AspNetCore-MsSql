using System;

namespace TwitterAutoMappers.DTO
{
    public class LikeDTO
    {
        public Guid TweetID { get; set; }
        public Guid UserID { get; set; }
    }
}
