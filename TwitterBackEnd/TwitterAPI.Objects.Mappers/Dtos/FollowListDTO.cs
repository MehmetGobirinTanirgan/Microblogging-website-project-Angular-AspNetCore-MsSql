using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class FollowListDTO
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public List<FollowCardDTO> Followers { get; set; }
        public List<FollowCardDTO> Followings { get; set; }
    }
}
