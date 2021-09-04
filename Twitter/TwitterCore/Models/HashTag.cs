using System;
using System.Collections.Generic;
using TwitterCore.Entities.CoreEntities;

namespace TwitterCore.Models
{
    public class HashTag : SimpleEntity
    {
        public string HashTagDetail { get; set; }
        public int TweetCounter { get; set; }

        public Guid? AgendaID { get; set; }
        public virtual Agenda Agenda { get; set; }
        public virtual List<TweetHashTag> TweetsOfHashtag { get; set; }
    }
}
