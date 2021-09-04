using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterAutoMappers.DTO
{
    public class FollowListDTO
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public List<FollowerFollowingDTO> Followers { get; set; }
        public List<FollowerFollowingDTO> Followings { get; set; }
    }
}
