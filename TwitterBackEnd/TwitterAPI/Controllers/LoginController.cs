using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterAPI.Settings;
using TwitterCore.Models;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;
        private readonly IAuthenticationService authenticationService;
        private readonly IConfiguration configuration;
        public LoginController(IUserService userService, IMapper mapper,
            IAuthenticationService authenticationService, IConfiguration configuration)
        {
            this.userService = userService;
            this.mapper = mapper;
            this.authenticationService = authenticationService;
            this.configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO signUpDTO)
        {
            bool IsUserExist;
            if (ModelState.IsValid)
            {
                IsUserExist = signUpDTO.EmailAddress != null ?
                    await userService.IsUserExistAsync(x => x.EmailAddress.Equals(signUpDTO.EmailAddress)) :
                    await userService.IsUserExistAsync(x => x.PhoneNumber.Equals(signUpDTO.PhoneNumber));

                if (!IsUserExist)
                {
                    var newUser = mapper.Map<User>(signUpDTO);
                    await userService.CreateUserAsync(newUser);
                    return Ok();
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AuthenticationAsync([FromBody] LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                var appSettingsSection = configuration.GetSection("AppSettings");
                var appSettings = appSettingsSection.Get<AppSettings>();
                var homePageDTO = await authenticationService.AuthenticateAsync(loginDTO.UsernameOrPhoneOrEmail, loginDTO.Password,
                    appSettings.SecretKey);

                if (homePageDTO != null)
                {
                    return Ok(homePageDTO);
                }
            }
            return BadRequest();
        }
    }
}
