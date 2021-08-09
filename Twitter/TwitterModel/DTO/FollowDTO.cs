using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class FollowDTO
    {
        public Guid FollowingUserID { get; set; }
        public Guid FollowerUserID { get; set; }
    }
}
