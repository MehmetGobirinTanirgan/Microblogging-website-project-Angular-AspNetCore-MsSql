using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TwitterModel.Context;
using TwitterModel.Models;
using TwitterRepository.SimpleEntityRepository;

namespace TwitterRepository.TweetImageRepository
{
    public class TweetImageRepository : SimpleEntityRepository<TweetImage>, ITweetImageRepository
    {
        public TweetImageRepository(TwitterContext twitterContext) : base(twitterContext)
        {

        }

        public async Task<TweetImage> GetTweetImageWithTweetAndUserAsync(Guid id)
        {
            return await GetListByExpression(t => t.ID.Equals(id))
                .Include(t => t.Tweet).ThenInclude(u => u.User)
                .FirstOrDefaultAsync();
        }
    }
}
