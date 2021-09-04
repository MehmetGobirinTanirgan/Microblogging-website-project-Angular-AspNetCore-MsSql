using System;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterAPI.Services.TweetImageService
{
    public interface ITweetImageService
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
