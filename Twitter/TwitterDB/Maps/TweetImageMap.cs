using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class TweetImageMap : SimpleEntityMap<TweetImage>
    {
        public override void Configure(EntityTypeBuilder<TweetImage> builder)
        {
            builder.Property(x => x.ImagePath).IsRequired().HasMaxLength(1000);
            builder.Property(x => x.TweetID).IsRequired();

            builder.HasOne(ti => ti.Tweet)
                .WithMany(t => t.ImagesOfTweet)
                .HasForeignKey(ti => ti.TweetID);

            base.Configure(builder);
        }
    }
}
