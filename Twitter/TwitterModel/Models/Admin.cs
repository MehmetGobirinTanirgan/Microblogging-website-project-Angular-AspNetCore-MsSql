using System.ComponentModel.DataAnnotations;
using TwitterCore.Entities.CoreEntities;

namespace TwitterModel.Models
{
    public class Admin : ComplexEntity
    {
        [DataType(DataType.Text)]
        [Required, MaxLength(50)]
        public string Fullname { get; set; }

        [DataType(DataType.Text)]
        [Required, MaxLength(50)]
        public string Username { get; set; }

        [MaxLength(50),DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [MaxLength(20),DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [DataType(DataType.Password)]
        [Required, MaxLength(1000)]
        public string Password { get; set; }
    }
}
