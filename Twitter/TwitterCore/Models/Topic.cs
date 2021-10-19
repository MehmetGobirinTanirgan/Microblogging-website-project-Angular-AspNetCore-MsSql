using System;
using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities.Concrete;

namespace TwitterCore.Models
{
    public class Topic : SimpleEntity
    {
        public string TopicName { get; set; }
        public string TopicDetail { get; set; }

        public Guid? TopicCategoryID { get; set; }
        public virtual TopicCategory TopicCategory { get; set; }

        public virtual List<Tweet> Tweets { get; set; }

    }
}
