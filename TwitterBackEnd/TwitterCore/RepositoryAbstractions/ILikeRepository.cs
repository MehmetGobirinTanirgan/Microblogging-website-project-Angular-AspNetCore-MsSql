using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryAbstractions
{
    public interface ILikeRepository : IMTMEntityRepository<Like>
    {
        Task<List<Tweet>> GetMainUserLikedTweetsAsync(Guid id);
        Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id);
    }
}
