using System;
using System.Threading.Tasks;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
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
