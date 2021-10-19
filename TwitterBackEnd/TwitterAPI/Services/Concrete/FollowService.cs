using System.Threading.Tasks;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class FollowService : IFollowService
    {
        private readonly IUnitOfWork unitOfWork;

        public FollowService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task AddFollowAsync(Follow follow)
        {
            await unitOfWork.Follows.AddFollowAsync(follow);
            await unitOfWork.SaveAsync();
        }

        public async Task RemoveFollowAsync(Follow follow)
        {
            await unitOfWork.Follows.RemoveFollowAsync(follow);
            await unitOfWork.SaveAsync();
        }
        public async Task<bool> AnyFollowAsync(Follow follow)
        {
            return await unitOfWork.Follows.AnyFollowAsync(follow);
        }
    }
}
