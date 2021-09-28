using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterAPI.Services.UserService;
using TwitterAPI.Objects.Mappers.DTO;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public SearchController(IUserService userService,IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        [HttpGet("{searchText}")]
        public async Task<IActionResult> SearchUsers([FromRoute] string searchText)
        {
            if (searchText != null)
            {
                var users = await userService.SearchUsersAsync(searchText);
                var searchUserDTOs = mapper.Map<List<SearchUserDTO>>(users);
                return Ok(searchUserDTOs);
            }
            return BadRequest();
        }
    }
}
