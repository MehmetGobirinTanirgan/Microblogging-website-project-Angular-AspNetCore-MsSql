using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterAPI.Services.Abstract;
using TwitterCore.Models;
using TwitterCore.RepositoryAbstractions;

namespace TwitterAPI.Services.Concrete
{
    public class FollowService : IFollowService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public FollowService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<bool> FollowAsync(FollowCreationDTO followDTO)
        {
            if (followDTO != null)
            {
                var followingUser = await unitOfWork.Users.GetUserByUsernameAsync(followDTO.FollowingUsername);
                var followerUser = await unitOfWork.Users.GetUserByUsernameAsync(followDTO.FollowerUsername);
                var isUserBeingFollowedAlready = await AnyFollowAsync(followerUser.ID, followingUser.ID);

                if (!isUserBeingFollowedAlready)
                {
                    await unitOfWork.Follows.AddAsync(new Follow() { FollowerUserID = followerUser.ID, FollowingUserID = followingUser.ID });
                    followerUser.FollowingCounter++;
                    followingUser.FollowerCounter++;
                    unitOfWork.Users.Update(followerUser);
                    unitOfWork.Users.Update(followingUser);
                    await unitOfWork.SaveAsync();
                    return true;
                }
            }
            return false;
        }

        public async Task<bool> UnfollowAsync(string followerUsername, string followingUsername)
        {
            if (followerUsername != null && followingUsername != null)
            {
                var followingUser = await unitOfWork.Users.GetUserByUsernameAsync(followingUsername);
                var followerUser = await unitOfWork.Users.GetUserByUsernameAsync(followerUsername);
                var isUserBeingFollowedAlready = await AnyFollowAsync(followerUser.ID, followingUser.ID);

                if (isUserBeingFollowedAlready)
                {
                    await unitOfWork.Follows.DeleteAsync(x => x.FollowingUserID.Equals(followingUser.ID) && x.FollowerUserID.Equals(followerUser.ID));
                    followerUser.FollowingCounter--;
                    followingUser.FollowerCounter--;
                    unitOfWork.Users.Update(followerUser);
                    unitOfWork.Users.Update(followingUser);
                    await unitOfWork.SaveAsync();
                    return true;
                }
            }
            return false;
        }

        public async Task<FollowListDTO> GetAllFollowersFollowingsAsync(string username)
        {
            if (username != null)
            {
                var user = await unitOfWork.Users.GetUserWithFollowersAndFollowingsAsync(username);
                var followersDTO = mapper.Map<List<FollowCardDTO>>(user.Followers.Select(x => x.FollowerUser));
                var followingsDTO = mapper.Map<List<FollowCardDTO>>(user.Followings.Select(x => x.FollowingUser));

                var followList = new FollowListDTO()
                {
                    Fullname = user.Fullname,
                    Username = user.Username,
                    Followers = followersDTO,
                    Followings = followingsDTO
                };
                return followList;
            }
            return null;
        }

        public async Task<bool> AnyFollowAsync(Guid followerUserID, Guid followingUserID)
        {
            return await unitOfWork.Follows.AnyFollowAsync(new Follow() { FollowerUserID = followerUserID, FollowingUserID = followingUserID });
        }
    }
}
