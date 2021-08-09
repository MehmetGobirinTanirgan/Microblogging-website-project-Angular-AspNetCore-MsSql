using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterModel.Models;

namespace TwitterModel.Maps
{
    public class HashTagMap : SimpleEntityMap<HashTag>
    {
        public override void Configure(EntityTypeBuilder<HashTag> builder)
        {
            builder.Property(x => x.HashTagDetail).IsRequired().HasMaxLength(50);
            builder.Property(x => x.TweetCounter).IsRequired();
            builder.Property(x => x.AgendaID).IsRequired(false);

            builder.HasOne(h => h.Agenda)
                .WithMany(a => a.HashTags)
                .HasForeignKey(h => h.AgendaID);

            base.Configure(builder);
        }
    }
}
