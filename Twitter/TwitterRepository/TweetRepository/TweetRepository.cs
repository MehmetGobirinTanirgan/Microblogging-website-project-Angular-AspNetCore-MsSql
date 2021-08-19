using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterCore.Entities.Enums;
using TwitterModel.Context;
using TwitterModel.Models;
using TwitterRepository.ComplexEntityRepository;

namespace TwitterRepository.TweetRepository
{
    public class TweetRepository : ComplexEntityRepository<Tweet>, ITweetRepository
    {
        public TweetRepository(TwitterContext twitterContext) : base(twitterContext)
        {

        }

        public async Task<Tweet> GetTweetAsync(Guid id)
        {
            return await GetActives().Where(x => x.ID.Equals(id))
                .Include(x => x.User)
                .Include(x => x.ImagesOfTweet)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id)
        {
            return await GetActives().Where(x => x.UserID.Equals(id))
                .Include(x => x.User)
                .Include(x => x.ImagesOfTweet)
                .Include(x =>x.ReplyMainTweet).ThenInclude(y =>y.User)
                .ToListAsync();
        }

        public async Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id)
        {
            return await GetActives().Where(x => x.UserID.Equals(id))
                .Include(x => x.User).ThenInclude(y =>y.Followers)
                .Include(x =>x.UsersWhoLiked)
                .Include(x => x.ImagesOfTweet)
                .ToListAsync();
        }
        public async Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id)
        {
            return await GetActives().Where(x => x.ID.Equals(id))
                .Include(x => x.ReplyTweets).ThenInclude(y => y.User).ThenInclude(z =>z.Followers)
                .Include(x => x.ReplyTweets).ThenInclude(y => y.UsersWhoLiked)
                .Include(x => x.ReplyTweets).ThenInclude(y => y.ImagesOfTweet)
                .Include(x => x.User).ThenInclude(y =>y.Followers)
                .Include(x => x.UsersWhoLiked)
                .Include(x => x.ImagesOfTweet)
                .FirstOrDefaultAsync();
        }

        public void UpdateTweet(Tweet tweet)
        {
            Update(tweet);
        }

        public async Task DeleteTweetAsync(Guid id)
        {
            await DeleteAsync(id);
        }
    }
}
