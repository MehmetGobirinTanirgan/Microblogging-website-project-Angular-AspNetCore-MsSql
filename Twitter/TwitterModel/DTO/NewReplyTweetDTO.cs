using Microsoft.AspNetCore.Http;
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
        public List<IFormFile> ImageFiles { get; set; }      
        public Guid UserID { get; set; }
        public Guid MainTweetID { get; set; }
    }
}
