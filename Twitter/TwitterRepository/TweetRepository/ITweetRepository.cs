using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.ComplexEntityRepository;

namespace TwitterRepository.TweetRepository
{
    public interface ITweetRepository : IComplexEntityRepository<Tweet>
    {
        Task<Tweet> GetTweetAsync(Guid id);
        Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id);
        Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id);
        Task UpdateTweetAsync(Tweet tweet);
        Task DeleteTweetAsync(Guid id);
    }
}
