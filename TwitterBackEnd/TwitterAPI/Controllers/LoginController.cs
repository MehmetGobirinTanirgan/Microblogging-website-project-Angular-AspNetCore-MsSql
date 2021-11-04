using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IAuthenticationService authenticationService;
        public LoginController(IUserService userService, IAuthenticationService authenticationService)
        {
            this.userService = userService;
            this.authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO signUpDTO)
        {
            if (ModelState.IsValid)
            {
                var isItCreated = await userService.CreateUserAsync(signUpDTO);
                if (isItCreated)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Authentication([FromBody] LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                var userInfoDTO = await authenticationService.AuthenticateAsync(loginDTO.UsernameOrPhoneOrEmail, loginDTO.Password);
                if (userInfoDTO != null)
                {
                    return Ok(userInfoDTO);
                }
            }
            return BadRequest();
        }
    }
}
