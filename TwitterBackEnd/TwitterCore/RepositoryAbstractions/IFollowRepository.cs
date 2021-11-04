﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryAbstractions
{
    public interface IFollowRepository : IMTMEntityRepository<Follow>
    {
        Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id);
        Task<bool> AnyFollowAsync(Follow follow);
    }
}
