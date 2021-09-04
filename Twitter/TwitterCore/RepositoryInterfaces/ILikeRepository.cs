using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryInterfaces
{
    public interface ILikeRepository : IMTMEntityRepository<Like>
    {
        Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id);
        Task AddLikeAsync(Like like);
        Task RemoveLikeAsync(Like like);
    }
}
