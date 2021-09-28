using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.DTO
{
    public class NewReplyTweetDTO
    {
        public string TweetDetail { get; set; }
        public List<IFormFile> ImageFiles { get; set; }      
        public Guid UserID { get; set; }
        public Guid MainTweetID { get; set; }
    }
}
