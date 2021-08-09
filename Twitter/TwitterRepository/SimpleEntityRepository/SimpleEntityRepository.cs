﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;
using TwitterModel.Context;

namespace TwitterRepository.SimpleEntityRepository
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
            await twitterContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(T entity)
        {
            twitterContext.Set<T>().Update(entity);
            await twitterContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            twitterContext.Set<T>().Remove(await GetOneByIDAsync(id));
            await twitterContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Expression<Func<T, bool>> exp)
        {
            var entity = await GetOneByExpressionAsync(exp);
            twitterContext.Set<T>().Remove(entity);
            await twitterContext.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await twitterContext.SaveChangesAsync();
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
