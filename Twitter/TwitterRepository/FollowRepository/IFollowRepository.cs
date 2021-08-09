﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.MTMEntityRepository;

namespace TwitterRepository.FollowRepository
{
    public interface IFollowRepository : IMTMEntityRepository<Follow>
    {
        Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id);
        Task AddFollowAsync(Follow follow);
        Task RemoveFollowAsync(Follow follow);
        Task<bool> AnyFollowAsync(Follow follow);
    }
}
