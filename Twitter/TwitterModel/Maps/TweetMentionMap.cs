using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterModel.Models;

namespace TwitterModel.Maps
{
    public class TweetMentionMap : MTMEntityMap<TweetMention>
    {
        public override void Configure(EntityTypeBuilder<TweetMention> builder)
        {
            builder.Property(x => x.TweetID).IsRequired();
            builder.Property(x => x.MentionedUserID).IsRequired();
            builder.HasKey(x => new { x.TweetID, x.MentionedUserID });

            builder.HasOne(tm => tm.Tweet)
                .WithMany(t => t.Mentions)
                .HasForeignKey(tm => tm.TweetID)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(tm => tm.MentionedUser)
                .WithMany(u => u.MentionedTweets)
                .HasForeignKey(tm => tm.TweetID)
                .OnDelete(DeleteBehavior.NoAction);

            base.Configure(builder);
        }
    }
}
