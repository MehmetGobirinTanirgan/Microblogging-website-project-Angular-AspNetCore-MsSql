using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryAbstractions
{
    public interface ITweetRepository : IComplexEntityRepository<Tweet>
    {
        Task<Tweet> GetTweetAsync(Guid id);
        Task<List<Tweet>> GetMainUserTweetsAndRepliesAsync(Guid id);
        Task<List<Tweet>> GetForeignUserTweetsAndRepliesAsync(Guid id);
        Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id);
    }
}
