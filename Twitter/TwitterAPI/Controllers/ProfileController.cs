using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterModel.DTO;
using TwitterModel.Models;
using TwitterService.TweetService;
using TwitterService.UserService;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ITweetService tweetService;
        private readonly IMapper mapper;

        public ProfileController(IUserService userService, ITweetService tweetService, IMapper mapper)
        {
            this.userService = userService;
            this.tweetService = tweetService;
            this.mapper = mapper;
        }

        [HttpGet("{userID}")]
        public async Task<IActionResult> GetUserProfile([FromRoute] Guid userID)
        {
            if (userID != Guid.Empty)
            {
                var user = await userService.GetUserByIDAsync(userID);
                if (user != null)
                {
                    var userProfileDTO = mapper.Map<UserProfileDTO>(user);
                    var ownTweets = await tweetService.GetUserOwnTweetsAsync(user.ID);
                    var likedTweets = await tweetService.GetUserLikedTweetsAsync(user.ID);
                    ownTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = true;
                        x.LikeFlag = likedTweets.Any(l => l.ID.Equals(x.ID));
                        x.FollowFlag = false;
                    });
                    likedTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = ownTweets.Any(o => o.ID.Equals(x.ID));
                        x.LikeFlag = true;
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(user.ID));
                    });

                    if (ownTweets.Count > 0 || likedTweets.Count > 0)
                    {
                        var ownTweetDTOs = mapper.Map<List<TweetDTO>>(ownTweets);
                        var likedTweetDTOs = mapper.Map<List<TweetDTO>>(likedTweets);
                        var nonReplyOwnTweetDTOs = ownTweetDTOs.Where(x => x.MainTweetOwnerID == null && x.MainTweetOwnerUsername == null);
                        var mediaTypeTweetDTOs = ownTweetDTOs.Where(x => x.TweetImageInfos.Count > 0);

                        userProfileDTO.OwnTweets = ownTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfileDTO.NonReplyOwnTweets = nonReplyOwnTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfileDTO.LikedTweets = likedTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfileDTO.MediaTypeTweets = mediaTypeTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                    }
                    return Ok(userProfileDTO);
                }
            }
            return NoContent();
        }

        [HttpGet("{foreignUserID}/{mainUserID}")]
        public async Task<IActionResult> GetForeignUserProfile([FromRoute] Guid foreignUserID, Guid mainUserID)
        {
            if (mainUserID != Guid.Empty && foreignUserID != Guid.Empty)
            {
                var foreignUser = await userService.GetUserWithFollowersAsync(foreignUserID);
                foreignUser.FollowFlag = foreignUser.Followers.Any(x => x.FollowerUserID.Equals(mainUserID));
                if (foreignUser != null)
                {
                    var ForeignUserProfileDTO = mapper.Map<ForeignUserProfileDTO>(foreignUser);
                    var ownTweets = await tweetService.GetForeignUserOwnTweetsAsync(foreignUser.ID);
                    var likedTweets = await tweetService.GetForeignUserLikedTweetsAsync(foreignUser.ID);
                    ownTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = false;
                        x.LikeFlag = x.UsersWhoLiked.Any(y => y.UserID.Equals(mainUserID));
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(mainUserID));
                    });
                    likedTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = x.UserID.Equals(mainUserID);
                        x.LikeFlag = x.UsersWhoLiked.Any(y => y.UserID.Equals(mainUserID));
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(mainUserID));
                    });

                    if (ownTweets.Count > 0 || likedTweets.Count > 0)
                    {
                        var ownTweetDTOs = mapper.Map<List<TweetDTO>>(ownTweets);
                        var likedTweetDTOs = mapper.Map<List<TweetDTO>>(likedTweets);
                        var nonReplyOwnTweetDTOs = ownTweetDTOs.Where(x => x.MainTweetOwnerID == null && x.MainTweetOwnerUsername == null);
                        var mediaTypeTweetDTOs = ownTweetDTOs.Where(x => x.TweetImageInfos.Count > 0);

                        ForeignUserProfileDTO.OwnTweets = ownTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfileDTO.NonReplyOwnTweets = nonReplyOwnTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfileDTO.LikedTweets = likedTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfileDTO.MediaTypeTweets = mediaTypeTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                    }
                    return Ok(ForeignUserProfileDTO);
                }
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProfileEditInfos([FromRoute] Guid id)
        {
            if (id != Guid.Empty)
            {
                var user = await userService.GetUserByIDAsync(id);
                if (user != null)
                {
                    var userProfileInfos = mapper.Map<ProfileEditModalDTO>(user);
                    return Ok(userProfileInfos);
                }
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileEditDTO profileEditDTO)
        {
            if (ModelState.IsValid)
            {
                var user = await userService.GetUserByIDAsync(profileEditDTO.ID);
                mapper.Map<ProfileEditDTO, User>(profileEditDTO, user);
                await userService.UpdateUserAsync(user);
                return Ok();
            }
            return BadRequest();
        }
    }
}
