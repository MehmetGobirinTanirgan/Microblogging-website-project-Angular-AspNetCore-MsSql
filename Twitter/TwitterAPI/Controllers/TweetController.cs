using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterAPI.Models;
using TwitterAPI.Upload;
using TwitterCore.Entities.Enums;
using TwitterModel.DTO;
using TwitterModel.Models;
using TwitterService.TweetService;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly ITweetService tweetService;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinarySettings;

        public TweetController(ITweetService tweetService, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            this.tweetService = tweetService;
            this.mapper = mapper;
            this.cloudinarySettings = cloudinarySettings;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllRelationalTweets(Guid id)
        {
            if (id != Guid.Empty)
            {
                var userTweets = await tweetService.GetUserOwnTweetsAsync(id);
                var userLikedTweets = await tweetService.GetUserLikedTweetsAsync(id);
                var followingUsersTweets = await tweetService.GetFollowingUsersTweetsAsync(id);

                if (userTweets.Count > 0 || userLikedTweets.Count > 0 || followingUsersTweets.Count > 0)
                {
                    userTweets = userTweets.Except(userLikedTweets, new TweetComparer()).ToList();
                    followingUsersTweets = followingUsersTweets.Except(userLikedTweets, new TweetComparer()).ToList();
                    userTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = true;
                        x.LikeFlag = false;
                        x.FollowFlag = false;
                    });

                    followingUsersTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = false;
                        x.LikeFlag = false;
                        x.FollowFlag = true;
                    });

                    userLikedTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = x.UserID.Equals(id);
                        x.LikeFlag = true;
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(id));
                    });

                    var userTweetDTOs = mapper.Map<List<TweetDTO>>(userTweets);
                    var userLikedTweetDTOs = mapper.Map<List<TweetDTO>>(userLikedTweets);
                    var followingUsersTweetDTOs = mapper.Map<List<TweetDTO>>(followingUsersTweets);

                    var allRelationalTweets = userTweetDTOs.Union(userLikedTweetDTOs).Union(followingUsersTweetDTOs).ToList();
                    return Ok(allRelationalTweets.OrderByDescending(x => x.CreatedDate));
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddNewTweet([FromForm] NewTweetDTO newTweetDTO)
        {
            if (ModelState.IsValid)
            {
                var upload = new FileUpload(cloudinarySettings);
                var uploadResult = new List<string>();

                if (newTweetDTO.ImageFiles != null)
                {
                    uploadResult = upload.ImageUpload(newTweetDTO.ImageFiles);

                    if (uploadResult == null)
                    {
                        return BadRequest();
                    }
                }
                
                var newTweet = mapper.Map<Tweet>(newTweetDTO);
                var newTweetID = await tweetService.AddNewTweetAsync(newTweet, uploadResult);
                var newTweetWithUserAndImages = await tweetService.GetTweetAsync(newTweetID);
                var tweetDTO = mapper.Map<TweetDTO>(newTweetWithUserAndImages);
                tweetDTO.OwnershipStatus = true;
                tweetDTO.LikeFlag = false;
                return CreatedAtAction("AddNewTweet", tweetDTO);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTweet([FromRoute] Guid id)
        {
            if (id != Guid.Empty)
            {
                var tweet = await tweetService.GetTweetAsync(id);
                if (tweet.ReplyMainTweetID != null)
                {
                    var replyToThisTweet = await tweetService.GetTweetAsync(tweet.ReplyMainTweetID.GetValueOrDefault());
                    if (replyToThisTweet != null)
                    {
                        replyToThisTweet.ReplyCounter = replyToThisTweet.ReplyCounter - 1;
                        await tweetService.UpdateTweetAsync(replyToThisTweet);
                    }
                }
                await tweetService.DeleteTweetAsync(id);
                return Ok();
            }
            return BadRequest();
        }


        [HttpPost]
        public async Task<IActionResult> AddLike([FromBody] LikeDTO likeDTO)
        {
            if (ModelState.IsValid)
            {
                var like = mapper.Map<Like>(likeDTO);
                var result = await tweetService.AddLikeAsync(like);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{tweetID}/{userID}")]
        public async Task<IActionResult> RemoveLike([FromRoute] Guid tweetID, Guid userID)
        {
            if (ModelState.IsValid)
            {
                var like = new Like()
                {
                    TweetID = tweetID,
                    UserID = userID
                };

                var result = await tweetService.RemoveLikeAsync(like);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddReplyTweet([FromForm] NewReplyTweetDTO newReplyTweetDTO)
        {
            if (ModelState.IsValid)
            {
                var upload = new FileUpload(cloudinarySettings);
                var uploadResult = new List<string>();

                if (newReplyTweetDTO.ImageFiles != null)
                {
                    uploadResult = upload.ImageUpload(newReplyTweetDTO.ImageFiles);

                    if (uploadResult == null)
                    {
                        return BadRequest();
                    }
                }

                var newReplyTweet = mapper.Map<Tweet>(newReplyTweetDTO);
                var mainTweet = await tweetService.GetTweetAsync(newReplyTweetDTO.MainTweetID);
                mainTweet.ReplyCounter++;
                await tweetService.UpdateTweetAsync(mainTweet);
                var newReplyTweetID = await tweetService.AddNewTweetAsync(newReplyTweet, uploadResult);
                var newReplyTweetWithUserAndImages = await tweetService.GetTweetAsync(newReplyTweetID);
                newReplyTweetWithUserAndImages.OwnershipStatus = true;
                newReplyTweetWithUserAndImages.LikeFlag = false;
                var tweetDTO = mapper.Map<TweetDTO>(newReplyTweetWithUserAndImages);
                tweetDTO.MainTweetOwnerID = mainTweet.UserID;
                tweetDTO.MainTweetOwnerUsername = mainTweet.User.Username;
                return CreatedAtAction("AddReplyTweet", tweetDTO);
            }
            return BadRequest();
        }


        [HttpGet("{tweetID}/{userID}")]
        public async Task<IActionResult> GetTweetWithReplyTweets([FromRoute] Guid tweetID, Guid userID)
        {
            var tweet = await tweetService.GetTweetWithReplyTweetsAsync(tweetID);
            tweet.OwnershipStatus = tweet.UserID.Equals(userID);
            tweet.LikeFlag = tweet.UsersWhoLiked.Any(x => x.UserID.Equals(userID));
            tweet.FollowFlag = tweet.User.Followers.Any(x => x.FollowerUserID.Equals(userID));
            if (tweet != null)
            {
                var mainTweetDTO = mapper.Map<TweetDTO>(tweet);

                var tweetDTOs = new List<TweetDTO>()
                    {
                        mainTweetDTO
                    };
                if (tweet.ReplyTweets.Count > 0)
                {
                    var activeReplyTweets = tweet.ReplyTweets.Where(x => x.Status != ComplexEntityStatus.Passive).ToList();
                    activeReplyTweets.ForEach(x => x.OwnershipStatus = x.UserID.Equals(userID));
                    activeReplyTweets.ForEach(x => x.FollowFlag = x.User.Followers.Any(y => y.Equals(userID)));
                    foreach (var likes in activeReplyTweets.Select(x => x.UsersWhoLiked))
                    {
                        if (likes.Count > 0)
                        {
                            activeReplyTweets.Where(x => x.ID.Equals(likes.First().TweetID)).ToList().ForEach(x => x.LikeFlag = likes.Any(x => x.UserID.Equals(userID)));
                        }
                    }

                    var replyTweetDTOsOfMainTweet = mapper.Map<List<TweetDTO>>(activeReplyTweets);
                    tweetDTOs.AddRange(replyTweetDTOsOfMainTweet);
                    return Ok(tweetDTOs.OrderBy(x => x.CreatedDate));
                }
                return Ok(tweetDTOs);
            }
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTweetImage(Guid id)
        {
            var tweetImage = await tweetService.GetTweetImageAsync(id);
            if (tweetImage != null)
            {
                var tweetImageDTO = mapper.Map<TweetImageDTO>(tweetImage);
                return Ok(tweetImageDTO);
            }
            return NoContent();
        }
    }
}
