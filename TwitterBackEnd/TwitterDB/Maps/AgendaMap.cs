using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterCore.CoreMaps;
using TwitterCore.Models;

namespace TwitterDB.Maps
{
    public class AgendaMap : SimpleEntityMap<Agenda>
    {
        public override void Configure(EntityTypeBuilder<Agenda> builder)
        {
            builder.Property(x => x.AgendaDetail).IsRequired().HasMaxLength(50);
            base.Configure(builder);
        }
    }
}
