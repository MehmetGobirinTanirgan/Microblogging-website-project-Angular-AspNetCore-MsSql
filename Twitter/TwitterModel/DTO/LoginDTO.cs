using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterModel.DTO
{
    public class LoginDTO
    {
        public string UsernameOrPhoneOrEmail { get; set; }
        public string Password { get; set; }
    }
}
