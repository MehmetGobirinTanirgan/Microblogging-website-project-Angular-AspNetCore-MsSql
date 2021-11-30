using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities.Concrete;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.Sql.Concrete
{
    public class SimpleEntityRepository<T> : ISimpleEntityRepository<T> where T : SimpleEntity
    {
        private readonly TwitterContext twitterContext;
        public SimpleEntityRepository(TwitterContext twitterContext)
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

        public async Task DeleteAsync(Guid id)
        {
            twitterContext.Set<T>().Remove(await GetOneByIDAsync(id));
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

        public Task<T> GetOneByIDAsync(Guid id)
        {
            return twitterContext.Set<T>().FirstOrDefaultAsync(s => s.ID.Equals(id));
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
