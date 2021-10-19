using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class TweetHashTagMap : MTMEntityMap<TweetHashTag>
    {
        public override void Configure(EntityTypeBuilder<TweetHashTag> builder)
        {
            builder.Property(x => x.TweetID).IsRequired();
            builder.Property(x => x.HashTagID).IsRequired();
            builder.HasKey(x => new { x.TweetID, x.HashTagID });

            builder.HasOne(th => th.Tweet)
                .WithMany(t => t.HashtagsOfTweet)
                .HasForeignKey(th => th.TweetID);

            builder.HasOne(th => th.HashTag)
                .WithMany(h => h.TweetsOfHashtag)
                .HasForeignKey(th => th.HashTagID);

            base.Configure(builder);
        }
    }
}
