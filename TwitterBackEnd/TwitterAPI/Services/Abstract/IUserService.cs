using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface IUserService
    {
        Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByIDAsync(Guid id);
        Task<User> GetUserWithFollowersAsync(Guid id);
        Task<User> GetUserWithFollowingsAsync(Guid id);
        Task<User> GetUserWithFollowersAndFollowingsAsync(Guid id);
        Task<bool> IsUserExistAsync(Expression<Func<User, bool>> exp);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<List<User>> SearchUsersAsync(string searchText);
    }
}
