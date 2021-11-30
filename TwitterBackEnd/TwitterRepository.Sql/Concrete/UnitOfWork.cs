using System;
using System.Threading.Tasks;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.Sql.Concrete
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool disposedValue = false;
        private readonly TwitterContext context;

        public UnitOfWork(TwitterContext context)
        {
            this.context = context;
            Users = new UserRepository(context);
            Tweets = new TweetRepository(context);
            TweetImages = new TweetImageRepository(context);
            Likes = new LikeRepository(context);
            Follows = new FollowRepository(context);
        }

        public IUserRepository Users { get; private set; }
        public ITweetRepository Tweets { get; private set; }
        public ITweetImageRepository TweetImages { get; private set; }
        public ILikeRepository Likes { get; private set; }
        public IFollowRepository Follows { get; private set; }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
