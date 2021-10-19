using System.Threading.Tasks;
using TwitterCore.Models;

namespace TwitterAPI.Services.Abstract
{
    public interface IFollowService
    {
        Task AddFollowAsync(Follow follow);
        Task RemoveFollowAsync(Follow follow);
        Task<bool> AnyFollowAsync(Follow follow);
    }
}
