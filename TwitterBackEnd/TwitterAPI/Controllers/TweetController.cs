using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;

namespace TwitterAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly ITweetService tweetService;

        public TweetController(ITweetService tweetService)
        {
            this.tweetService = tweetService;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetAllRelationalTweets(string username)
        {
            if (username != null)
            {
                var allRelationalTweets = await tweetService.GetAllRelationalTweets(username);
                if (allRelationalTweets != null)
                {
                    return Ok(allRelationalTweets);
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddTweet([FromForm] TweetCreationDTO newTweetDTO)
        {
            if (ModelState.IsValid)
            {
                var createdTweet = await tweetService.AddTweetAsync(newTweetDTO);
                return CreatedAtAction("AddTweet", createdTweet);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTweet([FromRoute] Guid id)
        {
            if (id != Guid.Empty)
            {
                await tweetService.DeleteTweetAsync(id);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddReplyTweet([FromForm] ReplyTweetCreationDTO newReplyTweetDTO)
        {
            if (ModelState.IsValid)
            {
                var createdReplyTweet = await tweetService.AddReplyTweetAsync(newReplyTweetDTO);
                return CreatedAtAction("AddReplyTweet", createdReplyTweet);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddLike([FromBody] LikeCreationDTO likeDTO)
        {
            if (ModelState.IsValid)
            {
                var result = await tweetService.AddLikeAsync(likeDTO);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{tweetID}/{username}")]
        public async Task<IActionResult> RemoveLike([FromRoute] Guid tweetID, string username)
        {
            if (ModelState.IsValid)
            {
                var result = await tweetService.RemoveLikeAsync(tweetID, username);
                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpGet("{tweetID}/{username}")]
        public async Task<IActionResult> GetTweetWithReplyTweets([FromRoute] Guid tweetID, string username)
        {
            if (tweetID != Guid.Empty && username != null)
            {
                var tweets = await tweetService.GetTweetWithReplyTweetsAsync(tweetID, username);
                if (tweets != null)
                {
                    return Ok(tweets);
                }
                return NoContent();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTweetImage(Guid id)
        {
            if (id != Guid.Empty)
            {
                var tweetImageDTO = await tweetService.GetTweetImageAsync(id);
                if (tweetImageDTO != null)
                {
                    return Ok(tweetImageDTO);
                }
                return NoContent();
            }
            return BadRequest();
        }
    }
}
