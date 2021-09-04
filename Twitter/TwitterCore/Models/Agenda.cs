using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Models
{
    public class Agenda : SimpleEntity
    {
        public string AgendaDetail { get; set; }

        public virtual List<HashTag> HashTags { get; set; }
    }
}
