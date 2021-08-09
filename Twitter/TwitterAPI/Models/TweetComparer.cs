using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using TwitterModel.Models;

namespace TwitterAPI.Models
{
    public class TweetComparer : IEqualityComparer<Tweet>
    {
        public bool Equals(Tweet x, Tweet y)
        {
            if (x.ID == y.ID && x.UserID == y.UserID)
            {
                return true;
            }
            return false;
        }

        public int GetHashCode([DisallowNull] Tweet obj)
        {
            return obj.ID.GetHashCode();
        }
    }
}
