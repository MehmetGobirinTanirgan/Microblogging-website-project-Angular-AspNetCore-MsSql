using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TwitterAPI.Services.Abstract;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IUserService userService;

        public SearchController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{searchText}")]
        public async Task<IActionResult> SearchUsers([FromRoute] string searchText)
        {
            if (searchText != null)
            {
                var searchUserDTOs = await userService.SearchUsersAsync(searchText);
                if (searchUserDTOs != null)
                {
                    return Ok(searchUserDTOs);
                }
                return NoContent();
            }
            return BadRequest();
        }
    }
}
