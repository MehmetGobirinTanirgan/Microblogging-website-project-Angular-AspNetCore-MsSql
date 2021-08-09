﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterModel.Models;

namespace TwitterModel.Maps
{
    public class LikeMap : MTMEntityMap<Like>
    {
        public override void Configure(EntityTypeBuilder<Like> builder)
        {
            builder.Property(x => x.TweetID).IsRequired();
            builder.Property(x => x.UserID).IsRequired();
            builder.HasKey(x => new { x.TweetID, x.UserID });

            builder.HasOne(l => l.Tweet)
                .WithMany(t => t.UsersWhoLiked)
                .HasForeignKey(l => l.TweetID)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(l => l.User)
                .WithMany(u => u.LikedTweets)
                .HasForeignKey(l => l.UserID)
                .OnDelete(DeleteBehavior.NoAction);

            base.Configure(builder);
        }
    }
}
