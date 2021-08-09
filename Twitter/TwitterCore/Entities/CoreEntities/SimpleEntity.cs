using System;
using System.ComponentModel.DataAnnotations;

namespace TwitterCore.Entities.CoreEntities
{
    public class SimpleEntity : IEntity
    {
        public Guid ID { get; set; }
    }
}
