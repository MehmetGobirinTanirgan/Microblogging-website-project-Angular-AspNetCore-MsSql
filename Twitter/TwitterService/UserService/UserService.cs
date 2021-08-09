using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.UserRepository;

namespace TwitterService.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp) 
        {
            return await userRepository.GetUserWithAllTweetsAsync(exp);
        }
 
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await userRepository.GetUserByUsernameAsync(username);
        }
        public async Task<User> GetUserByIDAsync(Guid id)
        {
            return await userRepository.GetUserByIDAsync(id);
        }

        public async Task<User> GetUserWithFollowersAsync(Guid id)
        {
            return await userRepository.GetUserWithFollowersAsync(id);
        }
        public async Task<User> GetUserWithFollowingsAsync(Guid id)
        {
            return await userRepository.GetUserWithFollowingsAsync(id);
        }
        public async Task<User> GetUserWithFollowersAndFollowingsAsync(Guid id)
        {
            return await userRepository.GetUserWithFollowersAndFollowingsAsync(id);
        }

        public async Task<bool> IsUserExistAsync(Expression<Func<User, bool>> exp)
        {
            return await userRepository.AnyAsync(exp);
        }

        public async Task CreateUserAsync(User user)
        {
            await userRepository.CreateAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await userRepository.UpdateAsync(user);
        }
        public async Task<List<User>> SearchUsersAsync(string searchText)
        {
            return await userRepository.SearchUsersAsync(searchText);
        }
    }
}
