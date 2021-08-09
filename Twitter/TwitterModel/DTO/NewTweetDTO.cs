using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class NewTweetDTO
    {
        public string TweetDetail { get; set; }
        public List<string> ImagePaths { get; set; }
        public Guid UserID { get; set; }
    }
}
