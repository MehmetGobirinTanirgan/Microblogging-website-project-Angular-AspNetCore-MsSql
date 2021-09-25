using System;
using System.Threading.Tasks;

namespace TwitterCore.RepositoryInterfaces
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
