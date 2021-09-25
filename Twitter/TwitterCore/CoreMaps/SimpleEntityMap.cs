using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.CoreMaps
{
    public class SimpleEntityMap<T> : IEntityTypeConfiguration<T> where T : SimpleEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(x => x.ID);
        }
    }
}
