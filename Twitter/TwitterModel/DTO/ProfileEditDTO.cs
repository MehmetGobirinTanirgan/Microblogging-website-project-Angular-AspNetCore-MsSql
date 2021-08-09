using System;

namespace TwitterModel.DTO
{
    public class ProfileEditDTO
    {
        public Guid ID { get; set; }
        public string Fullname { get; set; }
        public string PersonalInfo { get; set; }
        public string Location { get; set; }
        public string PersonalWebSiteURL { get; set; }
        public string ProfilePicPath { get; set; }
        public string BackgroundPath { get; set; }
    }
}
