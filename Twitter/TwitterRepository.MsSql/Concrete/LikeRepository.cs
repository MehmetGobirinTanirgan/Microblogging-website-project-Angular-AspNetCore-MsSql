using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.MsSql.Concrete
{
    public class LikeRepository : MTMEntityRepository<Like>, ILikeRepository
    {
        public LikeRepository(TwitterContext twitterContext) : base(twitterContext)
        {
            
        }

        public async Task AddLikeAsync(Like like)
        {
            await AddAsync(like);
        }
        public async Task RemoveLikeAsync(Like like)
        {
            await DeleteAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID));
        }

        public async Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id)
        {
            return await GetListByExpression(x => x.UserID.Equals(id))
                .Where(x => x.Tweet.Status.Equals(ComplexEntityStatus.Active))
                .Include(x => x.Tweet).ThenInclude(y => y.User).ThenInclude(z =>z.Followers)
                .Include(x => x.Tweet).ThenInclude(y => y.ImagesOfTweet)                
                .Select(x =>x.Tweet)
                .ToListAsync();
        }

        public async Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id)
        {
            return await GetListByExpression(x => x.UserID.Equals(id))
                .Where(x => x.Tweet.Status.Equals(ComplexEntityStatus.Active))
                .Include(x => x.Tweet).ThenInclude(y => y.User).ThenInclude(z =>z.Followers)
                .Include(x => x.Tweet).ThenInclude(y => y.ImagesOfTweet)
                .Include(x =>x.Tweet).ThenInclude(y =>y.UsersWhoLiked)
                .Select(x => x.Tweet)
                .ToListAsync();
        }

    }
}
