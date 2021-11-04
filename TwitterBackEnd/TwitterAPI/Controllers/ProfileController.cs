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
    public class ProfileController : ControllerBase
    {
        private readonly IUserService userService;

        public ProfileController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetMainUserProfile([FromRoute] string username)
        {
            if (username != null)
            {
                var userProfile = await userService.GetMainUserProfileAsync(username);
                if (userProfile != null)
                {
                    return Ok(userProfile);
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpGet("{foreignUsername}/{mainUsername}")]
        public async Task<IActionResult> GetForeignUserProfile([FromRoute] string foreignUsername, string mainUsername)
        {
            if (mainUsername != null && foreignUsername != null)
            {
                var foreignUserProfile = await userService.GetForeignUserProfileAsync(foreignUsername, mainUsername);
                if (foreignUserProfile != null)
                {
                    return Ok(foreignUserProfile);
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromForm] ProfileEditDTO profileEditDTO)
        {
            if (ModelState.IsValid)
            {
                var updatedUserProfile = await userService.UpdateProfileAsync(profileEditDTO);
                if (updatedUserProfile != null)
                {
                    return Ok(updatedUserProfile);
                }
            }
            return BadRequest();
        }
    }
}
