using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class LikeDTO
    {
        public Guid TweetID { get; set; }
        public Guid UserID { get; set; }
    }
}
