using System;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Models
{
    public class Follow : MTMEntity
    {
        public Guid FollowerUserID { get; set; }
        public virtual User FollowerUser { get; set; }
        public Guid FollowingUserID { get; set; }
        public virtual User FollowingUser { get; set; }
    }
}
