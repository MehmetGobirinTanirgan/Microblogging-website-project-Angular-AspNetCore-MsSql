using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.UnitOfWork;

namespace TwitterService.UserService
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp) 
        {
            return await unitOfWork.Users.GetUserWithAllTweetsAsync(exp);
        }
 
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await unitOfWork.Users.GetUserByUsernameAsync(username);
        }
        public async Task<User> GetUserByIDAsync(Guid id)
        {
            return await unitOfWork.Users.GetUserByIDAsync(id);
        }

        public async Task<User> GetUserWithFollowersAsync(Guid id)
        {
            return await unitOfWork.Users.GetUserWithFollowersAsync(id);
        }
        public async Task<User> GetUserWithFollowingsAsync(Guid id)
        {
            return await unitOfWork.Users.GetUserWithFollowingsAsync(id);
        }
        public async Task<User> GetUserWithFollowersAndFollowingsAsync(Guid id)
        {
            return await unitOfWork.Users.GetUserWithFollowersAndFollowingsAsync(id);
        }

        public async Task<bool> IsUserExistAsync(Expression<Func<User, bool>> exp)
        {
            return await unitOfWork.Users.AnyAsync(exp);
        }

        public async Task CreateUserAsync(User user)
        {
            await unitOfWork.Users.CreateAsync(user);
            await unitOfWork.SaveAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            unitOfWork.Users.Update(user);
            await unitOfWork.SaveAsync();
        }

        public async Task<List<User>> SearchUsersAsync(string searchText)
        {
            return await unitOfWork.Users.SearchUsersAsync(searchText);
        }
    }
}
