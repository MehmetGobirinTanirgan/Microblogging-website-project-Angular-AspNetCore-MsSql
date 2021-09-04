using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterAutoMappers.DTO
{
    public class LoginDTO
    {
        public string UsernameOrPhoneOrEmail { get; set; }
        public string Password { get; set; }
    }
}
