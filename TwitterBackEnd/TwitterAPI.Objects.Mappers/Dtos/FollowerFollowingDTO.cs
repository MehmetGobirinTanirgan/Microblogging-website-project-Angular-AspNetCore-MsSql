using System;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class FollowerFollowingDTO
    {
        public Guid ID { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string ProfilePicPath { get; set; }
    }
}
