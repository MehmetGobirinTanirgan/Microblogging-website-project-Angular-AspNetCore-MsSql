using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterModel.DTO;
using TwitterService.UserService;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly IUserService userService;

        public UserDataController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserPicPath ([FromRoute]Guid id)
        {
            if (id != Guid.Empty)
            {
                var user = await userService.GetUserByIDAsync(id);
                if (user != null)
                {
                    return Ok(user.ProfilePicPath);
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserData([FromRoute] Guid id)
        {
            if (id != Guid.Empty)
            {
                var user = await userService.GetUserByIDAsync(id);
                if (user != null)
                {                   
                    return Ok(new LogoutDTO { Fullname = user.Fullname,ProfilePicPath = user.ProfilePicPath});
                }
                return NoContent();
            }
            return BadRequest();
        }
    }
}
