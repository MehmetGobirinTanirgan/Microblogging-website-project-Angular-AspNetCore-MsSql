using System;
using TwitterCore.Entities.CoreEntities.Concrete;

namespace TwitterCore.Models
{
    public class TweetHashTag : MTMEntity
    {
        public Guid HashTagID { get; set; }
        public virtual HashTag HashTag { get; set; }

        public Guid TweetID { get; set; }
        public virtual Tweet Tweet { get; set; }
    }
}
