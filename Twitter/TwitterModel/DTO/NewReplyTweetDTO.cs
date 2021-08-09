using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class NewReplyTweetDTO
    {
        public string TweetDetail { get; set; }
        public List<string> ImagePaths { get; set; }      
        public Guid UserID { get; set; }
        public Guid MainTweetID { get; set; }
    }
}
