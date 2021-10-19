using System;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class FollowDTO
    {
        public Guid FollowingUserID { get; set; }
        public Guid FollowerUserID { get; set; }
    }
}
