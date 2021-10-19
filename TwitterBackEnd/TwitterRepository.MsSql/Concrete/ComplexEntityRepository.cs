using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities.Concrete;
using TwitterCore.Entities.Enums;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;

namespace TwitterRepository.MsSql.Concrete
{
    public class ComplexEntityRepository<T> : IComplexEntityRepository<T> where T : ComplexEntity
    {
        private readonly TwitterContext twitterContext;
        public ComplexEntityRepository(TwitterContext twitterContext)
        {
            this.twitterContext = twitterContext;
        }

        public async Task CreateAsync(T entity)
        {
            await twitterContext.Set<T>().AddAsync(entity);
        }

        public void Update(T entity)
        {
            twitterContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            entity.Status = ComplexEntityStatus.Passive;
            Update(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            T entity = await GetOneByIDAsync(id);
            entity.Status = ComplexEntityStatus.Passive;
            Update(entity);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> exp)
        {
            return await Task.FromResult(twitterContext.Set<T>().AsNoTracking().Any(exp));
        }

        public async Task<T> GetOneByIDAsync(Guid id)
        {
            return await twitterContext.Set<T>().FirstOrDefaultAsync(x => x.ID == id && x.Status != ComplexEntityStatus.Passive);
        }

        public async Task<T> GetOneByExpressionAsync(Expression<Func<T, bool>> exp)
        {
            return await twitterContext.Set<T>().FirstOrDefaultAsync(exp);
        }
       
        public IQueryable<T> GetAll()
        {
            return twitterContext.Set<T>();
        }

        public IQueryable<T> GetActives()
        {
            return twitterContext.Set<T>().Where(x => x.Status != ComplexEntityStatus.Passive);
        }
      
        public IQueryable<T> GetListByExpression(Expression<Func<T, bool>> exp)
        {
            return GetActives().Where(exp);
        }
        
    }
}
