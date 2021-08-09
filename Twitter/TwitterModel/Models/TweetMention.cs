using System;
using TwitterCore.Entities.CoreEntities;

namespace TwitterModel.Models
{
    public class TweetMention : MTMEntity
    {
        public Guid MentionedUserID { get; set; }
        public virtual User MentionedUser { get; set; }

        public Guid TweetID { get; set; }
        public virtual Tweet Tweet { get; set; }  
    }
}
