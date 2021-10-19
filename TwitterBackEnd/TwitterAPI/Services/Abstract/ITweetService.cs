using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface ITweetService
    {
        Task<Tweet> GetTweetAsync(Guid id);
        Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id);
        Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id);
        Task<Guid> AddNewTweetAsync(Tweet newTweet, List<string> imagePaths);
        Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id);
        Task UpdateTweetAsync(Tweet tweet);
        Task DeleteTweetAsync(Guid id);
        Task<bool> AddLikeAsync(Like like);
        Task<bool> RemoveLikeAsync(Like like);
        Task<TweetImage> GetTweetImageAsync(Guid id);


    }
}
