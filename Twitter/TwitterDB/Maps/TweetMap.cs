using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class TweetMap : ComplexEntityMap<Tweet>
    {
        public override void Configure(EntityTypeBuilder<Tweet> builder)
        {
            builder.Property(x => x.TweetDetail).IsRequired(false).HasMaxLength(280);
            builder.Property(x => x.LikeCounter).IsRequired();
            builder.Property(x => x.RetweetCounter).IsRequired();
            builder.Property(x => x.ReplyCounter).IsRequired();
            builder.Property(x => x.ReplyStatus).IsRequired();
            builder.Property(x => x.UserID).IsRequired();
            builder.Property(x => x.ReplyMainTweetID).IsRequired(false);
            builder.Property(x => x.RetweetMainTweetID).IsRequired(false);
            builder.Property(x => x.TopicID).IsRequired(false);
            builder.Ignore(x => x.LikeFlag);
            builder.Ignore(x => x.OwnershipStatus);
            builder.Ignore(x => x.FollowFlag);

            builder.HasOne(t => t.User)
                .WithMany(u => u.Tweets)
                .HasForeignKey(t => t.UserID);

            builder.HasOne(t => t.Topic)
                .WithMany(to => to.Tweets)
                .HasForeignKey(t => t.TopicID);

            builder.HasOne(t => t.ReplyMainTweet)
                .WithMany(t => t.ReplyTweets)
                .HasForeignKey(t => t.ReplyMainTweetID);

            builder.HasOne(t => t.RetweetMainTweet)
                .WithMany(t => t.Retweets)
                .HasForeignKey(t => t.RetweetMainTweetID);               
           
            base.Configure(builder);
        }
    }
}
