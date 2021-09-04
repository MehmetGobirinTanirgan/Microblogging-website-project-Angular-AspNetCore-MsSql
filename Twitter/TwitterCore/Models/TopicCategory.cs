using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Models
{
    public class TopicCategory : SimpleEntity
    {
        public string CategoryName { get; set; }
        public virtual List<Topic> Topics { get; set; }
    }
}
