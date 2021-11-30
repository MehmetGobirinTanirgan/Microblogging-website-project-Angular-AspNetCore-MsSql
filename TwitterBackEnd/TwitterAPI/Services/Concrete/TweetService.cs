using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class TweetService : ITweetService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IUploadService uploadService;

        public TweetService(IUnitOfWork unitOfWork, IMapper mapper, IUploadService uploadService)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.uploadService = uploadService;
        }

        public async Task<List<TweetDisplayDTO>> GetAllRelationalTweets(string username)
        {
            if (username != null)
            {
                var user = await unitOfWork.Users.GetUserByUsernameAsync(username);
                if (user != null)
                {
                    var userTweets = await GetMainUserTweetsAndRepliesAsync(user.ID);
                    var userLikedTweets = await GetMainUserLikedTweetsAsync(user.ID);
                    var followingUsersTweets = await GetFollowingUsersTweetsAsync(user.ID);

                    if (userTweets.Count > 0 || userLikedTweets.Count > 0 || followingUsersTweets.Count > 0)
                    {
                        userTweets = userTweets.Except(userLikedTweets).ToList();
                        followingUsersTweets = followingUsersTweets.Except(userLikedTweets).ToList();
                        userTweets.ForEach(x =>
                        {
                            x.OwnershipStatus = true;
                            x.LikeFlag = false;
                            x.FollowFlag = false;
                        });

                        followingUsersTweets.ForEach(x =>
                        {
                            x.OwnershipStatus = false;
                            x.LikeFlag = false;
                            x.FollowFlag = true;
                        });

                        userLikedTweets.ForEach(x =>
                        {
                            x.OwnershipStatus = x.UserID.Equals(user.ID);
                            x.LikeFlag = true;
                            x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(user.ID));
                        });

                        var userTweetDTOs = mapper.Map<List<TweetDisplayDTO>>(userTweets);
                        var userLikedTweetDTOs = mapper.Map<List<TweetDisplayDTO>>(userLikedTweets);
                        var followingUsersTweetDTOs = mapper.Map<List<TweetDisplayDTO>>(followingUsersTweets);

                        var allRelationalTweets = userTweetDTOs.Union(userLikedTweetDTOs).Union(followingUsersTweetDTOs).OrderByDescending(x => x.CreatedDate).ToList();
                        return allRelationalTweets;
                    }
                }
            }
            return null;
        }

        public async Task<TweetDisplayDTO> AddTweetAsync(TweetCreationDTO newTweetDTO)
        {
            if (newTweetDTO != null)
            {
                var imagePaths = new List<string>();

                if (newTweetDTO.ImageFiles != null)
                {
                    imagePaths = await uploadService.UploadImagesAsync(newTweetDTO.ImageFiles);

                    if (imagePaths == null)
                    {
                        return null;
                    }
                }

                var newTweet = mapper.Map<Tweet>(newTweetDTO);
                var user = await unitOfWork.Users.GetUserByUsernameAsync(newTweetDTO.Username);

                if (user != null)
                {
                    newTweet.UserID = user.ID;
                    newTweet.ImagesOfTweet = imagePaths.Select(i => new TweetImage() { ImagePath = i }).ToList();
                    await unitOfWork.Tweets.CreateAsync(newTweet);
                    await unitOfWork.SaveAsync();
                    var newTweetWithUserAndImages = await GetTweetAsync(newTweet.ID);
                    var tweetDTO = mapper.Map<TweetDisplayDTO>(newTweetWithUserAndImages);
                    tweetDTO.OwnershipStatus = true;
                    tweetDTO.LikeFlag = false;
                    return tweetDTO;
                }
            }
            return null;
        }

        public async Task DeleteTweetAsync(Guid id)
        {
            var tweet = await GetTweetAsync(id);
            if (tweet.ReplyMainTweetID != null)
            {
                var replyToThisTweet = await GetTweetAsync(tweet.ReplyMainTweetID.GetValueOrDefault());
                if (replyToThisTweet != null)
                {
                    replyToThisTweet.ReplyCounter--;
                    unitOfWork.Tweets.Update(replyToThisTweet);
                }
            }
            await unitOfWork.Tweets.DeleteAsync(id);
            await unitOfWork.SaveAsync();
        }

        public async Task<TweetDisplayDTO> AddReplyTweetAsync(ReplyTweetCreationDTO newReplyTweetDTO)
        {
            if (newReplyTweetDTO != null)
            {
                var imagePaths = new List<string>();
                if (newReplyTweetDTO.ImageFiles != null)
                {
                    imagePaths = await uploadService.UploadImagesAsync(newReplyTweetDTO.ImageFiles);

                    if (imagePaths == null)
                    {
                        return null;
                    }
                }

                var newTweet = mapper.Map<Tweet>(newReplyTweetDTO);
                var user = await unitOfWork.Users.GetUserByUsernameAsync(newReplyTweetDTO.Username);
                
                if (user != null)
                {
                    newTweet.UserID = user.ID;
                    newTweet.ImagesOfTweet = imagePaths.Select(i => new TweetImage() { ImagePath = i }).ToList();
                    await unitOfWork.Tweets.CreateAsync(newTweet);
                    var mainTweet = await GetTweetAsync(newReplyTweetDTO.MainTweetID);
                    mainTweet.ReplyCounter++;
                    unitOfWork.Tweets.Update(mainTweet);
                    await unitOfWork.SaveAsync();
                    var newTweetWithUserAndImages = await GetTweetAsync(newTweet.ID);
                    var tweetDTO = mapper.Map<TweetDisplayDTO>(newTweetWithUserAndImages);
                    tweetDTO.OwnershipStatus = true;
                    tweetDTO.LikeFlag = false;
                    tweetDTO.MainTweetOwnerUsername = mainTweet.User.Username;
                    return tweetDTO;
                }
            }
            return null;
        }

        public async Task<bool> AddLikeAsync(LikeCreationDTO likeDTO)
        {
            var user = await unitOfWork.Users.GetUserByUsernameAsync(likeDTO.Username);
            var like = new Like()
            {
                TweetID = likeDTO.TweetID,
                UserID = user.ID
            };

            if (!await unitOfWork.Likes.AnyAsync(x => x.TweetID.Equals(like.TweetID) && x.UserID.Equals(like.UserID)))
            {
                await unitOfWork.Likes.AddAsync(like);
                var tweet = await GetTweetAsync(like.TweetID);
                tweet.LikeCounter++;
                unitOfWork.Tweets.Update(tweet);
                await unitOfWork.SaveAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> RemoveLikeAsync(Guid tweetID, string username)
        {
            var user = await unitOfWork.Users.GetUserByUsernameAsync(username);
            if (await unitOfWork.Likes.AnyAsync(x => x.TweetID.Equals(tweetID) && x.UserID.Equals(user.ID)))
            {
                await unitOfWork.Likes.DeleteAsync(x => x.TweetID.Equals(tweetID) && x.UserID.Equals(user.ID));
                var tweet = await GetTweetAsync(tweetID);
                tweet.LikeCounter--;
                unitOfWork.Tweets.Update(tweet);
                await unitOfWork.SaveAsync();
                return true;
            }
            return false;
        }

        public async Task<List<TweetDisplayDTO>> GetTweetWithReplyTweetsAsync(Guid tweetID, string username)
        {
            if (tweetID != Guid.Empty && username != null)
            {
                var tweet = await unitOfWork.Tweets.GetTweetWithReplyTweetsAsync(tweetID);
                var user = await unitOfWork.Users.GetUserByUsernameAsync(username);
                if (tweet != null && user != null)
                {
                    tweet.OwnershipStatus = tweet.UserID.Equals(user.ID);
                    tweet.LikeFlag = tweet.UsersWhoLiked.Any(x => x.UserID.Equals(user.ID));
                    tweet.FollowFlag = tweet.User.Followers.Any(x => x.FollowerUserID.Equals(user.ID));
                    var mainTweetDTO = mapper.Map<TweetDisplayDTO>(tweet);
                    var tweetDTOs = new List<TweetDisplayDTO>()
                    {
                        mainTweetDTO
                    };

                    if (tweet.ReplyTweets.Count > 0)
                    {
                        var activeReplyTweets = tweet.ReplyTweets.Where(x => x.Status != ComplexEntityStatus.Passive).ToList();
                        activeReplyTweets.ForEach(x => x.OwnershipStatus = x.UserID.Equals(user.ID));
                        activeReplyTweets.ForEach(x => x.FollowFlag = x.User.Followers.Any(y => y.Equals(user.ID)));

                        foreach (var likes in activeReplyTweets.Select(x => x.UsersWhoLiked))
                        {
                            if (likes.Count > 0)
                            {
                                activeReplyTweets.Where(x => x.ID.Equals(likes.First().TweetID)).ToList().ForEach(x => x.LikeFlag = likes.Any(x => x.UserID.Equals(user.ID)));
                            }
                        }

                        var replyTweetDTOsOfMainTweet = mapper.Map<List<TweetDisplayDTO>>(activeReplyTweets);
                        tweetDTOs.AddRange(replyTweetDTOsOfMainTweet);
                    }
                    return tweetDTOs.OrderBy(x => x.CreatedDate).ToList();
                }
            }
            return null;
        }

        public async Task<Tweet> GetTweetAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetTweetAsync(id);
        }

        public async Task<List<Tweet>> GetMainUserTweetsAndRepliesAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetMainUserTweetsAndRepliesAsync(id);
        }

        public async Task<List<Tweet>> GetForeignUserTweetsAndRepliesAsync(Guid id)
        {
            return await unitOfWork.Tweets.GetForeignUserTweetsAndRepliesAsync(id);
        }

        public async Task<List<Tweet>> GetMainUserLikedTweetsAsync(Guid id)
        {
            return await unitOfWork.Likes.GetMainUserLikedTweetsAsync(id);
        }
        public async Task<List<Tweet>> GetForeignUserLikedTweetsAsync(Guid id)
        {
            return await unitOfWork.Likes.GetForeignUserLikedTweetsAsync(id);
        }

        public async Task<List<Tweet>> GetFollowingUsersTweetsAsync(Guid id)
        {
            return await unitOfWork.Follows.GetFollowingUsersTweetsAsync(id);
        }

        public async Task<TweetImageDTO> GetTweetImageAsync(Guid id)
        {
            if (id != Guid.Empty)
            {
                var tweetImage = await unitOfWork.TweetImages.GetTweetImageWithTweetAndUserAsync(id);
                if (tweetImage != null)
                {
                    var tweetImageDTO = mapper.Map<TweetImageDTO>(tweetImage);
                    return tweetImageDTO;
                }
            }
            return null;
        }
    }
}
