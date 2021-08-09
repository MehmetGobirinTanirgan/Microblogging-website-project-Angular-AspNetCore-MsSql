using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;

namespace TwitterModel.Models
{
    public class Follow : MTMEntity
    {
        public Guid FollowerUserID { get; set; }
        public virtual User FollowerUser { get; set; }
        public Guid FollowingUserID { get; set; }
        public virtual User FollowingUser { get; set; }
    }
}
