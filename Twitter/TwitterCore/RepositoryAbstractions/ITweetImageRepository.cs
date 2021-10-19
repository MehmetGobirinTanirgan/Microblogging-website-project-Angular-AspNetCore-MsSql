using System;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryAbstractions
{
    public interface ITweetImageRepository : ISimpleEntityRepository<TweetImage>
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
