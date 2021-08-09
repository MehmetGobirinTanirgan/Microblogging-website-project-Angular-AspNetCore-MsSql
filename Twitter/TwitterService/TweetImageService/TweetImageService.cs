using System;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.TweetImageRepository;

namespace TwitterService.TweetImageService
{
    public class TweetImageService : ITweetImageService
    {
        private readonly ITweetImageRepository tweetImageRepository;

        public TweetImageService(ITweetImageRepository tweetImageRepository)
        {
            this.tweetImageRepository = tweetImageRepository;
        }

        public async Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id)
        {
            return await tweetImageRepository.GetTweetImageWithTweetAndUserAsync(id);
        }
    }
}
