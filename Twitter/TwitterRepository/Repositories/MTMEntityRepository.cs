using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;
using TwitterCore.RepositoryInterfaces;
using TwitterDB.Context;

namespace TwitterRepository.Repositories
{
    public class MTMEntityRepository<T> : IMTMEntityRepository<T> where T : MTMEntity
    {
        private readonly TwitterContext twitterContext;

        public MTMEntityRepository(TwitterContext twitterContext)
        {
            this.twitterContext = twitterContext;
        }

        public async Task AddAsync(T entity)
        {
            await twitterContext.Set<T>().AddAsync(entity);
        }

        public void Update(T entity)
        {
            twitterContext.Set<T>().Update(entity);
        }

        public async Task DeleteAsync(Expression<Func<T, bool>> exp)
        {
            var entity = await GetOneByExpressionAsync(exp);
            twitterContext.Set<T>().Remove(entity);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> exp)
        {
            return await Task.FromResult(twitterContext.Set<T>().AsNoTracking().Any(exp));
        }

        public async Task<T> GetOneByExpressionAsync(Expression<Func<T, bool>> exp)
        {
            return await twitterContext.Set<T>().FirstOrDefaultAsync(exp);
        }

        public IQueryable<T> GetListByExpression(Expression<Func<T, bool>> exp)
        {
            return twitterContext.Set<T>().Where(exp);
        }

        public IQueryable<T> GetAll()
        {
            return twitterContext.Set<T>();
        }
    }
}
