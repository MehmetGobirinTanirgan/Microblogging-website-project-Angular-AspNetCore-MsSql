using System;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.UnitOfWork;

namespace TwitterService.TweetImageService
{
    public class TweetImageService : ITweetImageService
    {
        private readonly IUnitOfWork unitOfWork;

        public TweetImageService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id)
        {
            return await unitOfWork.TweetImages.GetTweetImageWithTweetAndUserAsync(id);
        }
    }
}
