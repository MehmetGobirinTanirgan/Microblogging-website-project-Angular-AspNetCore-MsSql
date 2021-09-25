using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryInterfaces
{
    public interface ITweetRepository : IComplexEntityRepository<Tweet>
    {
        Task<Tweet> GetTweetAsync(Guid id);
        Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id);
        Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id);
        void UpdateTweet(Tweet tweet);
        Task DeleteTweetAsync(Guid id);
    }
}
