using System;
using TwitterCore.Entities.CoreEntities.Abstract;

namespace TwitterCore.Entities.CoreEntities.Concrete
{
    public class SimpleEntity : IEntity
    {
        public Guid ID { get; set; }
    }
}
