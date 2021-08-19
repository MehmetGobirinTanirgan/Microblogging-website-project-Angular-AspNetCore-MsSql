using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;

namespace TwitterRepository.MTMEntityRepository
{
    public interface IMTMEntityRepository<T> where T: MTMEntity
    {
        Task AddAsync(T entity);
        void Update(T entity);
        Task DeleteAsync(Expression<Func<T, bool>> exp);
        Task<bool> AnyAsync(Expression<Func<T, bool>> exp);
        Task<T> GetOneByExpressionAsync(Expression<Func<T, bool>> exp);
        IQueryable<T> GetListByExpression(Expression<Func<T, bool>> exp);
        IQueryable<T> GetAll();
    }
}
