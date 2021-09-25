using System;

namespace TwitterAutoMappers.DTO
{
    public class FollowDTO
    {
        public Guid FollowingUserID { get; set; }
        public Guid FollowerUserID { get; set; }
    }
}
