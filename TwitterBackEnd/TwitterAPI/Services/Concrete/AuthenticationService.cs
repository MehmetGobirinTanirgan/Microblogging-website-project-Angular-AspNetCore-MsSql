using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterAPI.Settings;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IOptions<AppSettings> appSettings;

        public AuthenticationService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.appSettings = appSettings;
        }

        public async Task<UserInfoDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password)
        {
            if (usernameOrPhoneOrEmail != null && password != null)
            {
                var authenticatedUser = new User();
                var secretKey = appSettings.Value.SecretKey;

                if (!await unitOfWork.Users.AnyAsync(x => (x.Username.Equals(usernameOrPhoneOrEmail) || x.EmailAddress.Equals(usernameOrPhoneOrEmail) || x.PhoneNumber.Equals(usernameOrPhoneOrEmail)) && x.Password.Equals(password)))
                {
                    return null;
                }
                else
                {
                    authenticatedUser = await unitOfWork.Users.GetUserWithAllTweetsAsync(x => (x.Username.Equals(usernameOrPhoneOrEmail) || x.EmailAddress.Equals(usernameOrPhoneOrEmail) || x.PhoneNumber.Equals(usernameOrPhoneOrEmail))
                    && x.Password.Equals(password));
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                        new[]
                        {
                        new Claim("Username",authenticatedUser.Username)
                        }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var serializedToken = tokenHandler.WriteToken(token);
                var userInfoDTO = mapper.Map<UserInfoDTO>(authenticatedUser);
                userInfoDTO.Token = serializedToken;
                return userInfoDTO;
            }
            return null;
        }
    }
}
