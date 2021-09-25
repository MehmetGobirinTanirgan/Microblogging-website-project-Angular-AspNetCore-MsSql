using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.CoreMaps
{
    public class MTMEntityMap<T> : IEntityTypeConfiguration<T> where T : MTMEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            
        }
    }
}
