using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.DTO
{
    public class FollowListDTO
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public List<FollowerFollowingDTO> Followers { get; set; }
        public List<FollowerFollowingDTO> Followings { get; set; }
    }
}
