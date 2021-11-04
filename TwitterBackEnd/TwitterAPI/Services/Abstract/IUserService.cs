using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface IUserService
    {
        Task<User> GetUserWithAllTweetsAsync(Expression<Func<User, bool>> exp);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByIDAsync(Guid id);
        Task<User> GetUserWithFollowersAsync(string username);
        Task<User> GetUserWithFollowingsAsync(Guid id);
        Task<User> GetUserWithFollowersAndFollowingsAsync(string username);
        Task<bool> IsUserExistAsync(Expression<Func<User, bool>> exp);
        Task<bool> CreateUserAsync(SignUpDTO signupDTO);
        Task<List<SearchUserDTO>> SearchUsersAsync(string searchText);
        Task<MainUserProfileDTO> GetMainUserProfileAsync(string username);
        Task<ForeignUserProfileDTO> GetForeignUserProfileAsync(string foreignUsername, string mainUsername);
        Task<MainUserProfileCardDTO> UpdateProfileAsync(ProfileEditDTO profileEditDTO);
    }
}
