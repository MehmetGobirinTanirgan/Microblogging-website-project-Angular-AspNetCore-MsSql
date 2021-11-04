using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Services.Abstract
{
    public interface IAuthenticationService
    {
        Task<UserInfoDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password);
    }
}
