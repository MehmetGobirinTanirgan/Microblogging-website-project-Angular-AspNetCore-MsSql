using System;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryInterfaces
{
    public interface ITweetImageRepository : ISimpleEntityRepository<TweetImage>
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
