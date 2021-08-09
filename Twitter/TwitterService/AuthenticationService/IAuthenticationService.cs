using System.Threading.Tasks;
using TwitterModel.DTO;

namespace TwitterService.AuthenticationService
{
    public interface IAuthenticationService
    {
        Task<HomePageDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password, string secretKey);
    }
}
