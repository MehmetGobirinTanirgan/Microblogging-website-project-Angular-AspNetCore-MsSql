using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class FollowMap : MTMEntityMap<Follow>
    {
        public override void Configure(EntityTypeBuilder<Follow> builder)
        {
            builder.Property(x => x.FollowingUserID).IsRequired();
            builder.Property(x => x.FollowerUserID).IsRequired();
            builder.HasKey(x => new { x.FollowerUserID, x.FollowingUserID });

            builder.HasOne(f => f.FollowerUser)
                .WithMany(u => u.Followings)
                .HasForeignKey(f => f.FollowerUserID)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(f => f.FollowingUser)
                .WithMany(u => u.Followers)
                .HasForeignKey(f => f.FollowingUserID)
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}
