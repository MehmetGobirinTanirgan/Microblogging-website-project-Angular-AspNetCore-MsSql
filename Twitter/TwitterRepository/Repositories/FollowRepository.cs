using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;
using TwitterCore.RepositoryInterfaces;
using TwitterDB.Context;

namespace TwitterRepository.Repositories
{
    public class FollowRepository : MTMEntityRepository<Follow>,IFollowRepository
    {
        public FollowRepository(TwitterContext twitterContext) : base(twitterContext)
        {

        }

        public async Task AddFollowAsync(Follow follow)
        {
            await AddAsync(follow);
        }
        public async Task RemoveFollowAsync(Follow follow)
        {
            await DeleteAsync(x => x.FollowingUserID.Equals(follow.FollowingUserID) && x.FollowerUserID.Equals(follow.FollowerUserID));
        }

        public async Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id)
        {
            return await GetListByExpression(x => x.FollowerUserID.Equals(id)).
                Include(x => x.FollowingUser.Tweets).ThenInclude(z => z.ImagesOfTweet).
                Include(x => x.FollowingUser.Tweets).ThenInclude(z => z.User)
                .SelectMany(x => x.FollowingUser.Tweets)
                .Where(x => x.Status.Equals(ComplexEntityStatus.Active))
                .ToListAsync();
        }

        public async Task<bool> AnyFollowAsync(Follow follow)
        {
            return await AnyAsync(x => x.FollowerUserID.Equals(follow.FollowerUserID) && x.FollowingUserID.Equals(follow.FollowingUserID));
        }
    }
}
