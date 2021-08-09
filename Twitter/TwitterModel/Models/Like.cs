using System;
using TwitterCore.Entities.CoreEntities;

namespace TwitterModel.Models
{
    public class Like : MTMEntity
    {
        public Guid TweetID { get; set; }
        public virtual Tweet Tweet { get; set; }

        public Guid UserID { get; set; }
        public virtual User User { get; set; }
    }
}
