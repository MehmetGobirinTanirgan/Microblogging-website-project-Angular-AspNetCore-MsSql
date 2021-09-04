using Microsoft.AspNetCore.Http;
using System;

namespace TwitterAutoMappers.DTO
{
    public class ProfileEditDTO
    {
        public Guid ID { get; set; }
        public string Fullname { get; set; }
        public string PersonalInfo { get; set; }
        public string Location { get; set; }
        public string PersonalWebSiteURL { get; set; }
        public IFormFile ProfilePic { get; set; }
        public IFormFile BackgroundImage { get; set; }
    }
}
