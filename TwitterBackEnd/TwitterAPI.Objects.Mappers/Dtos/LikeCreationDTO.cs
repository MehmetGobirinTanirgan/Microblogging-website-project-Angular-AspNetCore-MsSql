using System;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class LikeCreationDTO
    {
        public Guid TweetID { get; set; }
        public string Username { get; set; }
    }
}
