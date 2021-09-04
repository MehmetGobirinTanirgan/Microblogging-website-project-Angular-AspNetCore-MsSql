using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.RepositoryInterfaces
{
    public interface IComplexEntityRepository<T> where T : ComplexEntity
    {
        Task CreateAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task DeleteAsync(Guid id);      
        Task<bool> AnyAsync(Expression<Func<T, bool>> exp);
        Task<T> GetOneByIDAsync(Guid id);
        Task<T> GetOneByExpressionAsync(Expression<Func<T, bool>> exp);
        IQueryable<T> GetAll();
        IQueryable<T> GetActives();
        IQueryable<T> GetListByExpression(Expression<Func<T, bool>> exp);      
       
    }
}
