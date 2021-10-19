using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Services.Abstract
{
    public interface IAuthenticationService
    {
        Task<HomePageDTO> AuthenticateAsync(string usernameOrPhoneOrEmail, string password, string secretKey);
    }
}
