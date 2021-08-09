using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
   public class TweetReplyStreamDTO
    {
        public Guid TweetID { get; set; }
        public Guid UserID { get; set; }
    }
}
