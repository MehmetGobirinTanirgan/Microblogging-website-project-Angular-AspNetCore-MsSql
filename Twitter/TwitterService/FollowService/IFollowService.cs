using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwitterModel.Models;

namespace TwitterService.FollowService
{
    public interface IFollowService
    {
        Task AddFollowAsync(Follow follow);
        Task RemoveFollowAsync(Follow follow);
        Task<bool> AnyFollowAsync(Follow follow);
    }
}
