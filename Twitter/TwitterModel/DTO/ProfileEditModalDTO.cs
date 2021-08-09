using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class ProfileEditModalDTO
    {
        public Guid ID { get; set; }
        public string Fullname { get; set; }
        public string PersonalInfo { get; set; }
        public string Location { get; set; }
        public string PersonalWebSiteURL { get; set; }
    }
}
