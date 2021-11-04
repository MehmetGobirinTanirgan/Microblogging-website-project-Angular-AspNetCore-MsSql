using System;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Services.Abstract
{
    public interface IFollowService
    {
        Task<bool> FollowAsync(FollowCreationDTO followDTO);
        Task<bool> UnfollowAsync(string followerUsername, string followingUsername);
        Task<FollowListDTO> GetAllFollowersFollowingsAsync(string username);
        Task<bool> AnyFollowAsync(Guid followerUserID, Guid followingUserID);
    }
}
