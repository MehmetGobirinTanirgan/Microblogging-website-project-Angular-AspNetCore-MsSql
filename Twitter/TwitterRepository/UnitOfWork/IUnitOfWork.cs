using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwitterRepository.FollowRepository;
using TwitterRepository.LikeRepository;
using TwitterRepository.TweetImageRepository;
using TwitterRepository.TweetRepository;
using TwitterRepository.UserRepository;

namespace TwitterRepository.UnitOfWork
{
   public interface IUnitOfWork : IDisposable
    {
        Task SaveAsync();
        IUserRepository Users { get; }
        ITweetRepository Tweets { get; }
        ITweetImageRepository TweetImages { get; }
        ILikeRepository Likes { get; }
        IFollowRepository Follows { get; }
    }
}
