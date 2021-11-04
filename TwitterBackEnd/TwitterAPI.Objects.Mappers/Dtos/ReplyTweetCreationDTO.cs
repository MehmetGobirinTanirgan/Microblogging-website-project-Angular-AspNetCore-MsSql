using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class ReplyTweetCreationDTO
    {
        public string TweetDetail { get; set; }
        public List<IFormFile> ImageFiles { get; set; }      
        public string Username { get; set; }
        public Guid MainTweetID { get; set; }
    }
}
