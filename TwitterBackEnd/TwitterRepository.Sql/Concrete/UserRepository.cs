using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.Sql.Concrete
{
    public class UserRepository : ComplexEntityRepository<User>, IUserRepository
    {
        public UserRepository(TwitterContext twitterContext) : base(twitterContext)
        {

        }

        public async Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp)
        {
            return await GetActives()
                .Include(x => x.Tweets)
                .Include(x => x.LikedTweets).ThenInclude(y => y.Tweet)
                .Include(x =>x.Followings).ThenInclude(y =>y.FollowingUser).ThenInclude(z => z.Tweets)
                .Include(x =>x.MentionedTweets).ThenInclude(y => y.Tweet)
                .FirstOrDefaultAsync(exp);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await GetOneByExpressionAsync(x =>x.Username == username && x.Status != ComplexEntityStatus.Passive);
        }

        public async Task<User> GetUserByIDAsync(Guid id)
        {
            return await GetOneByIDAsync(id);
        }

        public async Task<User> GetUserWithFollowersAsync(string username)
        {
            return await GetActives().Where(x => x.Username.Equals(username))
                .Include(x => x.Followers)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserWithFollowingsAsync(Guid id)
        {
            return await GetActives().Where(x => x.ID.Equals(id))
                .Include(x => x.Followings)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserWithFollowersAndFollowingsAsync(string username)
        {
            return await GetActives().Where(x => x.Username.Equals(username))
                .Include(x => x.Followers).ThenInclude(y =>y.FollowerUser)
                .Include(x => x.Followings).ThenInclude(y =>y.FollowingUser)
                .FirstOrDefaultAsync();
        }

        public async Task<List<User>> SearchUsersAsync(string searchText)
        {
            var users = await GetListByExpression(x => x.Fullname.Contains(searchText) || x.Username.Contains(searchText)).Take(10)
                .ToListAsync();
            return users;
        }
    }
}
