using System;
using TwitterCore.Entities.CoreEntities.Concrete;

namespace TwitterCore.Models
{
    public class TweetMention : MTMEntity
    {
        public Guid MentionedUserID { get; set; }
        public virtual User MentionedUser { get; set; }

        public Guid TweetID { get; set; }
        public virtual Tweet Tweet { get; set; }  
    }
}
