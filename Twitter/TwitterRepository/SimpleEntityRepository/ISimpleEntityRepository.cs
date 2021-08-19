using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TwitterCore.Entities.CoreEntities;

namespace TwitterRepository.SimpleEntityRepository
{
    public interface ISimpleEntityRepository<T> where T : SimpleEntity
    {
        Task AddAsync(T entity);
        void Update(T entity);
        Task DeleteAsync(Guid id);
        Task DeleteAsync(Expression<Func<T, bool>> exp);
        Task<bool> AnyAsync(Expression<Func<T, bool>> exp);     
        Task<T> GetOneByIDAsync(Guid id);
        Task<T> GetOneByExpressionAsync(Expression<Func<T, bool>> exp);
        IQueryable<T> GetListByExpression(Expression<Func<T, bool>> exp);
        IQueryable<T> GetAll();
       
    }
}
