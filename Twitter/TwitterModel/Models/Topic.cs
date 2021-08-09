using System;
using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;

namespace TwitterModel.Models
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
