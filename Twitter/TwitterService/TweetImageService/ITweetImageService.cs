using System;
using System.Threading.Tasks;
using TwitterModel.Models;

namespace TwitterService.TweetImageService
{
    public interface ITweetImageService
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
