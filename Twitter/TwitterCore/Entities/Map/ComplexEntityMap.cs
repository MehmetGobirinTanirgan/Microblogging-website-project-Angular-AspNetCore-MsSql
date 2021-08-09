using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Entities.Map
{
    public class ComplexEntityMap<T> : IEntityTypeConfiguration<T> where T : ComplexEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Status).IsRequired();
            builder.Property(x => x.CreatedDate).IsRequired();
            builder.Property(x => x.ModifiedDate).IsRequired(false);
        }
    }
}
