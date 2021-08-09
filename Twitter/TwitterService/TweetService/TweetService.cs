using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.FollowRepository;
using TwitterRepository.LikeRepository;
using TwitterRepository.TweetImageRepository;
using TwitterRepository.TweetRepository;

namespace TwitterService.TweetService
{
    public class TweetService : ITweetService
    {
        private readonly ITweetRepository tweetRepository;
        private readonly ILikeRepository likeRepository;
        private readonly IFollowRepository followRepository;
        private readonly ITweetImageRepository tweetImageRepository;

        public TweetService(ITweetRepository tweetRepository, ILikeRepository likeRepository, IFollowRepository followRepository
            , ITweetImageRepository tweetImageRepository)
        {
            this.tweetRepository = tweetRepository;
            this.likeRepository = likeRepository;
            this.followRepository = followRepository;
            this.tweetImageRepository = tweetImageRepository;
        }

        public async Task<Tweet> GetTweetAsync(Guid id)
        {
            return await tweetRepository.GetTweetAsync(id);
        }

        public async Task<List<Tweet>> GetUserOwnTweetsAsync(Guid id)
        {
            return await tweetRepository.GetUserOwnTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetForeignUserOwnTweetsAsync(Guid id)
        {
            return await tweetRepository.GetForeignUserOwnTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetUserLikedTweetsAsync(Guid id)
        {
            return await likeRepository.GetUserLikedTweetsAsync(id);
        }
        public async Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id)
        {
            return await likeRepository.GetForeignUserLikedTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id)
        {
            return await followRepository.GetFollowingUsersTweetsAsync(id);
        }

        public async Task<Tweet> GetTweetWithReplyTweetsAsync(Guid id)
        {
            return await tweetRepository.GetTweetWithReplyTweetsAsync(id);
        }

        public async Task<Guid> AddNewTweetAsync(Tweet newTweet, List<string> imagePaths)
        {
            await tweetRepository.CreateAsync(newTweet);
            if (imagePaths != null)
            {
                foreach (var imagePath in imagePaths)
                {
                    TweetImage tweetImage = new TweetImage()
                    {
                        ImagePath = imagePath,
                        TweetID = newTweet.ID,
                    };
                    await tweetImageRepository.AddAsync(tweetImage);
                }
            }
            return newTweet.ID;
        }

        public async Task UpdateTweetAsync(Tweet tweet)
        {
            await tweetRepository.UpdateTweetAsync(tweet);
        }

        public async Task DeleteTweetAsync(Guid id)
        {
            await tweetRepository.DeleteTweetAsync(id);
        }

        public async Task<bool> AddLikeAsync(Like like)
        {
            if (!await likeRepository.AnyAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID)))
            {
                await likeRepository.AddLikeAsync(like);
                var tweet = await GetTweetAsync(like.TweetID);
                tweet.LikeCounter++;
                await UpdateTweetAsync(tweet);
                return true;
            }
            return false;
        }

        public async Task<bool> RemoveLikeAsync(Like like)
        {
            if (await likeRepository.AnyAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID)))
            {
                await likeRepository.DeleteAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID));
                var tweet = await GetTweetAsync(like.TweetID);
                tweet.LikeCounter--;
                await UpdateTweetAsync(tweet);
                return true;
            }
            return false;
        }
        public async Task<TweetImage> GetTweetImageAsync(Guid id)
        {
            return await tweetImageRepository.GetTweetImageWithTweetAndUserAsync(id);
        }
    }
}
