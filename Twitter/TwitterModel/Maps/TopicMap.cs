using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterModel.Models;

namespace TwitterModel.Maps
{
    public class TopicMap : SimpleEntityMap<Topic>
    {
        public override void Configure(EntityTypeBuilder<Topic> builder)
        {
            builder.Property(x => x.TopicName).IsRequired().HasMaxLength(50);
            builder.Property(x => x.TopicDetail).IsRequired().HasMaxLength(50);
            builder.Property(x => x.TopicCategoryID).IsRequired(false);

            builder.HasOne(to => to.TopicCategory)
                .WithMany(tc => tc.Topics)
                .HasForeignKey(to => to.TopicCategoryID);

            base.Configure(builder);
        }
    }
}
