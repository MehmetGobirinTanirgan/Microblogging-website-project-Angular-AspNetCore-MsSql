using System;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.SimpleEntityRepository;

namespace TwitterRepository.TweetImageRepository
{
    public interface ITweetImageRepository : ISimpleEntityRepository<TweetImage>
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
