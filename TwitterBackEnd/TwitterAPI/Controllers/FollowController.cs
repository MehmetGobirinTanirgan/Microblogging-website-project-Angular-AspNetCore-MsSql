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
    public class FollowController : ControllerBase
    {
        private readonly IFollowService followService;

        public FollowController(IFollowService followService)
        {
            this.followService = followService;
        }

        [HttpPost]
        public async Task<IActionResult> Follow([FromBody] FollowCreationDTO followDTO)
        {
            if (ModelState.IsValid)
            {
                var result = await followService.FollowAsync(followDTO);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{followerUsername}/{followingUsername}")]
        public async Task<IActionResult> Unfollow([FromRoute] string followerUsername, string followingUsername)
        {
            if (ModelState.IsValid)
            {
                var result = await followService.UnfollowAsync(followerUsername, followingUsername);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetAllFollowersFollowings([FromRoute] string username)
        {
            if (username != null)
            {
                var followList = await followService.GetAllFollowersFollowingsAsync(username);

                if (followList != null)
                {
                    return Ok(followList);
                }
                return NoContent();
            }
            return BadRequest();
        }

    }
}
