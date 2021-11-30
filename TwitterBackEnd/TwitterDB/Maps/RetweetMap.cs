using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class RetweetMap : MTMEntityMap<Retweet>
    {
        public override void Configure(EntityTypeBuilder<Retweet> builder)
        {
            builder.Property(x => x.TweetID).IsRequired();
            builder.Property(x => x.UserID).IsRequired();
            builder.HasKey(x => new { x.TweetID, x.UserID });

            builder.HasOne(r => r.Tweet)
                .WithMany(t => t.Retweets)
                .HasForeignKey(l => l.TweetID)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(l => l.User)
                .WithMany(u => u.Retweets)
                .HasForeignKey(l => l.UserID)
                .OnDelete(DeleteBehavior.NoAction);
            base.Configure(builder);    
        }
    }
}
