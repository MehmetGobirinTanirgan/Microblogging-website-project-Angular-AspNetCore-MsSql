using AutoMapper;
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
