﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.Sql.Concrete
{
    public class FollowRepository : MTMEntityRepository<Follow>, IFollowRepository
    {
        public FollowRepository(TwitterContext twitterContext) : base(twitterContext)
        {

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
