using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace TwitterAPI.Objects.Mappers.DTO
{
    public class NewTweetDTO
    {
        public string TweetDetail { get; set; }
        public List<IFormFile> ImageFiles { get; set; }
        public Guid UserID { get; set; }
    }
}
