using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class AdminMap : ComplexEntityMap<Admin>
    {
        public override void Configure(EntityTypeBuilder<Admin> builder)
        {
            builder.Property(x => x.Fullname).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Username).IsRequired().HasMaxLength(50);
            builder.Property(x => x.EmailAddress).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.PhoneNumber).IsRequired(false).HasMaxLength(20);
            builder.Property(x => x.Password).IsRequired().HasMaxLength(1000);
            base.Configure(builder);
        }
    }
}
