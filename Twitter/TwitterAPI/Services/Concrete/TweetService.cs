using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class TweetService : ITweetService
    {
        private readonly IUnitOfWork unitOfWork;
        public TweetService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Tweet> GetTweetAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetTweetAsync(id);
        }

        public async Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetUserOwnTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetForeignUserOwnTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id)
        {
            return await unitOfWork.Likes.GetUserLikedTweetsAsync(id);
        }
        public async Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id)
        {
            return await unitOfWork.Likes.GetForeignUserLikedTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id)
        {
            return await unitOfWork.Follows.GetFollowingUsersTweetsAsync(id);
        }

        public async Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetTweetWithReplyTweetsAsync(id);
        }

        public async Task<Guid> AddNewTweetAsync(Tweet newTweet, List<string> imagePaths)
        {
            await unitOfWork.Tweets.CreateAsync(newTweet);
            if (imagePaths != null)
            {
                foreach (var imagePath in imagePaths)
                {
                    TweetImage tweetImage = new()
                    {
                        ImagePath = imagePath,
                        TweetID = newTweet.ID,
                    };
                    await unitOfWork.TweetImages.AddAsync(tweetImage);
                }
            }
            await unitOfWork.SaveAsync();
            return newTweet.ID;
        }

        public async Task UpdateTweetAsync(Tweet tweet)
        {
            unitOfWork.Tweets.UpdateTweet(tweet);
            await unitOfWork.SaveAsync();
        }

        public async Task DeleteTweetAsync(Guid id)
        {
            await unitOfWork.Tweets.DeleteTweetAsync(id);
            await unitOfWork.SaveAsync();
        }

        public async Task<bool> AddLikeAsync(Like like)
        {
            if (!await unitOfWork.Likes.AnyAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID)))
            {
                await unitOfWork.Likes.AddLikeAsync(like);
                var tweet = await GetTweetAsync(like.TweetID);
                tweet.LikeCounter++;
                await UpdateTweetAsync(tweet);
                return true;
            }
            await unitOfWork.SaveAsync();
            return false;
        }

        public async Task<bool> RemoveLikeAsync(Like like)
        {
            if (await unitOfWork.Likes.AnyAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID)))
            {
                await unitOfWork.Likes.DeleteAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID));
                var tweet = await GetTweetAsync(like.TweetID);
                tweet.LikeCounter--;
                await UpdateTweetAsync(tweet);
                return true;
            }
            await unitOfWork.SaveAsync();
            return false;
        }

        public async Task<TweetImage> GetTweetImageAsync(Guid id)
        {
            return await unitOfWork.TweetImages.GetTweetImageWithTweetAndUserAsync(id);
        }
    }
}
