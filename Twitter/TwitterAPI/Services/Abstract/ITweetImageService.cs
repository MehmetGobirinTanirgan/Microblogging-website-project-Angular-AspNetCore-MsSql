using System;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface ITweetImageService
    {
        Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id);
    }
}
