using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IFollowService followService;
        private readonly IMapper mapper;

        public FollowController(IUserService userService, IFollowService followService, IMapper mapper)
        {
            this.userService = userService;
            this.followService = followService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Follow([FromBody] FollowDTO followDTO)
        {
            if (ModelState.IsValid)
            {
                var followingUser = await userService.GetUserByIDAsync(followDTO.FollowingUserID);
                var followerUser = await userService.GetUserByIDAsync(followDTO.FollowerUserID);

                var follow = mapper.Map<Follow>(followDTO);
                var isUserBeingFollowedAlready = await followService.AnyFollowAsync(follow);

                if (!isUserBeingFollowedAlready)
                {
                    await followService.AddFollowAsync(follow);
                    followerUser.FollowingCounter++;
                    followingUser.FollowerCounter++;
                    await userService.UpdateUserAsync(followerUser);
                    await userService.UpdateUserAsync(followingUser);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{followerUserID}/{followingUserID}")]
        public async Task<IActionResult> Unfollow([FromRoute] Guid followerUserID, Guid followingUserID)
        {
            if (ModelState.IsValid)
            {
                var followingUser = await userService.GetUserByIDAsync(followingUserID);
                var followerUser = await userService.GetUserByIDAsync(followerUserID);

                var follow = new Follow()
                {
                    FollowerUserID = followerUserID,
                    FollowingUserID = followingUserID
                };

                var isUserBeingFollowedAlready = await followService.AnyFollowAsync(follow);

                if (isUserBeingFollowedAlready)
                {
                    await followService.RemoveFollowAsync(follow);
                    followerUser.FollowingCounter--;
                    followingUser.FollowerCounter--;
                    await userService.UpdateUserAsync(followerUser);
                    await userService.UpdateUserAsync(followingUser);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpGet("{userID}")]
        public async Task<IActionResult> GetAllFollowersFollowings([FromRoute] Guid userID)
        {
            if (userID != Guid.Empty)
            {
                var user = await userService.GetUserWithFollowersAndFollowingsAsync(userID);
                var followersDTO = mapper.Map<List<FollowerFollowingDTO>>(user.Followers.Select(x => x.FollowerUser));
                var followingsDTO = mapper.Map<List<FollowerFollowingDTO>>(user.Followings.Select(x => x.FollowingUser));

                var followList = new FollowListDTO()
                {
                    Fullname = user.Fullname,
                    Username = user.Username,
                    Followers = followersDTO,
                    Followings = followingsDTO
                };

                return Ok(followList);
            }
            return BadRequest();
        }

    }
}
