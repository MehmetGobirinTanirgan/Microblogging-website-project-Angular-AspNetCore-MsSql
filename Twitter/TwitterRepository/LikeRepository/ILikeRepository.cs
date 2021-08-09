using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.MTMEntityRepository;

namespace TwitterRepository.LikeRepository
{
    public interface ILikeRepository : IMTMEntityRepository<Like>
    {
        Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id);
        Task AddLikeAsync(Like like);
        Task RemoveLikeAsync(Like like);
    }
}
