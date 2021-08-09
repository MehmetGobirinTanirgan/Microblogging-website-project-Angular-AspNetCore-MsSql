using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwitterModel.Models;
using TwitterRepository.FollowRepository;

namespace TwitterService.FollowService
{
    public class FollowService : IFollowService
    {
        private readonly IFollowRepository followRepository;

        public FollowService(IFollowRepository followRepository)
        {
            this.followRepository = followRepository;
        }

        public async Task AddFollowAsync(Follow follow)
        {
            await followRepository.AddFollowAsync(follow);
        }

        public async Task RemoveFollowAsync(Follow follow)
        {
            await followRepository.RemoveFollowAsync(follow);
        }
        public async Task<bool> AnyFollowAsync(Follow follow)
        {
            return await followRepository.AnyFollowAsync(follow);
        }
    }
}
