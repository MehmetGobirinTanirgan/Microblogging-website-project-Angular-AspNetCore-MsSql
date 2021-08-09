using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.Entities.Map;
using TwitterModel.Models;

namespace TwitterModel.Maps
{
    public class TopicCategoryMap : SimpleEntityMap<TopicCategory>
    {
        public override void Configure(EntityTypeBuilder<TopicCategory> builder)
        {
            builder.Property(x => x.CategoryName).IsRequired().HasMaxLength(50);
            base.Configure(builder);
        }
    }
}
