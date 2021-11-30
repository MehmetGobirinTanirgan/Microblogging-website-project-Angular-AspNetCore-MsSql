using System;
using TwitterCore.Entities.CoreEntities.Concrete;

namespace TwitterCore.Models
{
    public class Retweet : MTMEntity
    {
        public Guid UserID { get; set; }
        public virtual User User { get; set; }
        public Guid TweetID { get; set; }
        public virtual Tweet Tweet { get; set; }
    }
}
