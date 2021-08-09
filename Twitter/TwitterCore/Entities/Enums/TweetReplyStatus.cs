using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterCore.Entities.Enums
{
    public enum TweetReplyStatus
    {
        Everyone = 1,
        FollowersFolloweds = 2,
        OnlyMentionedPeople = 3
    }
}
