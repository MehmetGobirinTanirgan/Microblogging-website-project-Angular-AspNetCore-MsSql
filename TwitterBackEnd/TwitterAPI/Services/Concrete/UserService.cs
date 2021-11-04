using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IUploadService uploadService;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IUploadService uploadService)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.uploadService = uploadService;
        }

        public async Task<bool> CreateUserAsync(SignUpDTO signUpDTO)
        {
            if (signUpDTO != null)
            {
                var IsUserExist = signUpDTO.EmailAddress != null ?
                                    await IsUserExistAsync(x => x.EmailAddress.Equals(signUpDTO.EmailAddress)) :
                                    await IsUserExistAsync(x => x.PhoneNumber.Equals(signUpDTO.PhoneNumber));

                if (!IsUserExist)
                {
                    var newUser = mapper.Map<User>(signUpDTO);
                    await unitOfWork.Users.CreateAsync(newUser);
                    await unitOfWork.SaveAsync();
                    return true;
                }
            }
            return false;
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

        public async Task<User> GetUserWithFollowersAsync(string username)
        {
            return await unitOfWork.Users.GetUserWithFollowersAsync(username);
        }

        public async Task<User> GetUserWithFollowingsAsync(Guid id)
        {
            return await unitOfWork.Users.GetUserWithFollowingsAsync(id);
        }

        public async Task<User> GetUserWithFollowersAndFollowingsAsync(string username)
        {
            return await unitOfWork.Users.GetUserWithFollowersAndFollowingsAsync(username);
        }

        public async Task<bool> IsUserExistAsync(Expression<Func<User, bool>> exp)
        {
            return await unitOfWork.Users.AnyAsync(exp);
        }

        public async Task<List<SearchUserDTO>> SearchUsersAsync(string searchText)
        {
            if (searchText != null)
            {
                var users = await unitOfWork.Users.SearchUsersAsync(searchText);
                var searchUserDTOs = mapper.Map<List<SearchUserDTO>>(users);
                return searchUserDTOs;
            }
            return null;
        }

        public async Task<MainUserProfileDTO> GetMainUserProfileAsync(string username)
        {
            if (username != null)
            {
                var user = await GetUserByUsernameAsync(username);
                if (user != null)
                {
                    var userProfile = mapper.Map<MainUserProfileDTO>(user);
                    var tweetsAndReplies = await unitOfWork.Tweets.GetMainUserTweetsAndRepliesAsync(user.ID);
                    var likedTweets = await unitOfWork.Likes.GetMainUserLikedTweetsAsync(user.ID);

                    tweetsAndReplies.ForEach(x =>
                    {
                        x.OwnershipStatus = true;
                        x.LikeFlag = likedTweets.Any(l => l.ID.Equals(x.ID));
                        x.FollowFlag = false;
                    });

                    likedTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = tweetsAndReplies.Any(o => o.ID.Equals(x.ID));
                        x.LikeFlag = true;
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(user.ID));
                    });

                    if (tweetsAndReplies.Count > 0 || likedTweets.Count > 0)
                    {
                        var tweetAndReplyDTOs = mapper.Map<List<TweetDisplayDTO>>(tweetsAndReplies);
                        var likedTweetDTOs = mapper.Map<List<TweetDisplayDTO>>(likedTweets);
                        var tweetDTOs = tweetAndReplyDTOs.Where(x => x.MainTweetOwnerUsername == null);
                        var mediaDTOs = tweetAndReplyDTOs.Where(x => x.TweetImageInfos.Count > 0);
                        userProfile.Tweets = tweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfile.TweetsAndReplies = tweetAndReplyDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfile.Media = mediaDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        userProfile.Likes = likedTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                    }
                    return userProfile;
                }
            }
            return null;
        }

        public async Task<ForeignUserProfileDTO> GetForeignUserProfileAsync(string foreignUsername, string mainUsername)
        {
            if (mainUsername != null && foreignUsername != null)
            {
                var foreignUser = await GetUserWithFollowersAsync(foreignUsername);
                var mainUser = await GetUserByUsernameAsync(mainUsername);
                foreignUser.FollowFlag = foreignUser.Followers.Any(x => x.FollowerUserID.Equals(mainUser.ID));
                if (foreignUser != null)
                {
                    var ForeignUserProfile = mapper.Map<ForeignUserProfileDTO>(foreignUser);
                    var tweetsAndReplies = await unitOfWork.Tweets.GetForeignUserTweetsAndRepliesAsync(foreignUser.ID);
                    var likedTweets = await unitOfWork.Likes.GetForeignUserLikedTweetsAsync(foreignUser.ID);

                    tweetsAndReplies.ForEach(x =>
                    {
                        x.OwnershipStatus = false;
                        x.LikeFlag = x.UsersWhoLiked.Any(y => y.UserID.Equals(mainUser.ID));
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(mainUser.ID));
                    });

                    likedTweets.ForEach(x =>
                    {
                        x.OwnershipStatus = x.UserID.Equals(mainUser.ID);
                        x.LikeFlag = x.UsersWhoLiked.Any(y => y.UserID.Equals(mainUser.ID));
                        x.FollowFlag = x.User.Followers.Any(y => y.FollowerUserID.Equals(mainUser.ID));
                    });

                    if (tweetsAndReplies.Count > 0 || likedTweets.Count > 0)
                    {
                        var tweetAndReplyDTOs = mapper.Map<List<TweetDisplayDTO>>(tweetsAndReplies);
                        var likedTweetDTOs = mapper.Map<List<TweetDisplayDTO>>(likedTweets);
                        var tweetDTOs = tweetAndReplyDTOs.Where(x => x.MainTweetOwnerUsername == null);
                        var mediaDTOs = tweetAndReplyDTOs.Where(x => x.TweetImageInfos.Count > 0);
                        ForeignUserProfile.Tweets = tweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfile.TweetsAndReplies = tweetAndReplyDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfile.Media = mediaDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                        ForeignUserProfile.Likes = likedTweetDTOs.OrderByDescending(x => x.CreatedDate).ToList();
                    }
                    return ForeignUserProfile;
                }
            }
            return null;
        }

        public async Task<MainUserProfileCardDTO> UpdateProfileAsync(ProfileEditDTO profileEditDTO)
        {
            if (profileEditDTO != null)
            {
                string profilePicPath = null;
                string bgImagePath = null;

                if (profileEditDTO.ProfilePic != null)
                {
                    profilePicPath = await uploadService.UploadImageAsync(profileEditDTO.ProfilePic);
                }

                if (profileEditDTO.BackgroundImage != null)
                {
                    bgImagePath = await uploadService.UploadImageAsync(profileEditDTO.BackgroundImage);
                }

                var user = await GetUserByUsernameAsync(profileEditDTO.Username);
                mapper.Map<ProfileEditDTO, User>(profileEditDTO, user);

                if (profilePicPath != null)
                {
                    user.ProfilePicPath = profilePicPath;
                }

                if (bgImagePath != null)
                {
                    user.BackgroundPath = bgImagePath;
                }

                unitOfWork.Users.Update(user);
                await unitOfWork.SaveAsync();
                var updatedUserProfile = mapper.Map<MainUserProfileCardDTO>(user);
                return updatedUserProfile;
            }
            return null;
        }
    }
}
