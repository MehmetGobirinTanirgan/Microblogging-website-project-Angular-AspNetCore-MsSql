using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface ITweetService
    {
        Task<List<TweetDisplayDTO>> GetAllRelationalTweets(string username);
        Task<TweetDisplayDTO> AddTweetAsync(TweetCreationDTO newTweetDTO);
        Task DeleteTweetAsync(Guid id);
        Task<TweetDisplayDTO> AddReplyTweetAsync(ReplyTweetCreationDTO newReplyTweetDTO);
        Task<bool> AddLikeAsync(LikeCreationDTO likeDTO);
        Task<bool> RemoveLikeAsync(Guid tweetID, string username);
        Task<List<TweetDisplayDTO>> GetTweetWithReplyTweetsAsync(Guid tweetID, string username);
        Task<Tweet> GetTweetAsync(Guid id);
        Task<List<Tweet>> GetMainUserTweetsAndRepliesAsync(Guid id);
        Task<List<Tweet>> GetForeignUserTweetsAndRepliesAsync(Guid id);
        Task<List<Tweet>> GetMainUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id);
        Task<TweetImageDTO> GetTweetImageAsync(Guid id);


    }
}
