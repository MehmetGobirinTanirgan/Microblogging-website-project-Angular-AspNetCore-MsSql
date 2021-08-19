using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.ComplexEntityRepository;

namespace TwitterRepository.UserRepository
{
    public interface IUserRepository : IComplexEntityRepository<User>
    {
        Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByIDAsync(Guid id);
        Task<User> GetUserWithFollowersAsync(Guid id);
        Task<User> GetUserWithFollowingsAsync(Guid id);
        Task<User> GetUserWithFollowersAndFollowingsAsync(Guid id);
        void UpdateUser(User user);
        Task<List<User>> SearchUsersAsync(string searchText);
    }
}
