using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryInterfaces
{
    public interface IFollowRepository : IMTMEntityRepository<Follow>
    {
        Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id);
        Task AddFollowAsync(Follow follow);
        Task RemoveFollowAsync(Follow follow);
        Task<bool> AnyFollowAsync(Follow follow);
    }
}
