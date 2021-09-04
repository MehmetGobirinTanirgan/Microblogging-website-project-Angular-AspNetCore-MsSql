using System.Threading.Tasks;
using TwitterAutoMappers.DTO;

namespace TwitterAPI.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        Task<HomePageDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password, string secretKey);
    }
}
