using TwitterCore.Entities.CoreEntities.Concrete;

namespace TwitterCore.Models
{
    public class Admin : ComplexEntity
    {
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }
}
