using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TwitterModel.DTO;
using TwitterModel.Models;
using TwitterRepository.UnitOfWork;

namespace TwitterService.AuthenticationService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork unitOfWork;
        public AuthenticationService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<HomePageDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password, string secretKey)
        {
            var loggingUser = new User();

            if (!await unitOfWork.Users.AnyAsync(x => (x.Username.Equals(usernameOrPhoneOrEmail) || x.EmailAddress.Equals(usernameOrPhoneOrEmail) || x.PhoneNumber.Equals(usernameOrPhoneOrEmail)) && x.Password.Equals(password)))
            {
                return null;
            }
            else
            {
                loggingUser = await unitOfWork.Users.GetUserWithAllTweetsAsync(x => (x.Username.Equals(usernameOrPhoneOrEmail) || x.EmailAddress.Equals(usernameOrPhoneOrEmail) || x.PhoneNumber.Equals(usernameOrPhoneOrEmail))
                && x.Password.Equals(password));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim("ID", loggingUser.ID.ToString()),
                        new Claim("Fullname", loggingUser.Fullname),
                        new Claim("Username",loggingUser.Username)
                    }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string generatedToken = tokenHandler.WriteToken(token);
            return new HomePageDTO() 
            {
                ID = loggingUser.ID,
                Fullname = loggingUser.Fullname,
                Username = loggingUser.Username,
                ProfilePicPath = loggingUser.ProfilePicPath,
                Token = generatedToken,
            };
        }
    }
}
