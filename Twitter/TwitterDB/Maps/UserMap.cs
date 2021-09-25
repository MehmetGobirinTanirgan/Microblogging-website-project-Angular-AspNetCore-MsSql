using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class UserMap : ComplexEntityMap<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Fullname).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Username).IsRequired().HasMaxLength(50);
            builder.Property(x => x.PersonalInfo).IsRequired(false).HasMaxLength(160);
            builder.Property(x => x.Location).IsRequired(false).HasMaxLength(100);
            builder.Property(x => x.PersonalWebSiteURL).IsRequired(false).HasMaxLength(500);
            builder.Property(x => x.EmailAddress).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.PhoneNumber).IsRequired(false).HasMaxLength(20);
            builder.Property(x => x.Password).IsRequired().HasMaxLength(1000);
            builder.Property(x => x.Birthday).IsRequired();
            builder.Property(x => x.ProfilePicPath).IsRequired(false).HasMaxLength(1000);
            builder.Property(x => x.BackgroundPath).IsRequired(false).HasMaxLength(1000);
            builder.Property(x => x.FollowingCounter).IsRequired();
            builder.Property(x => x.FollowerCounter).IsRequired();
            builder.Ignore(x => x.FollowFlag);
            base.Configure(builder);    
        }
    }
}
