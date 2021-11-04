﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterCore.RepositoryAbstractions
{
    public interface IUserRepository : IComplexEntityRepository<User>
    {
        Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByIDAsync(Guid id);
        Task<User> GetUserWithFollowersAsync(string username);
        Task<User> GetUserWithFollowingsAsync(Guid id);
        Task<User> GetUserWithFollowersAndFollowingsAsync(string username);
        Task<List<User>> SearchUsersAsync(string searchText);
    }
}
