using System;
using TwitterCore.Entities.CoreEntities.Abstract;
using TwitterCore.Entities.Enums;

namespace TwitterCore.Entities.CoreEntities.Concrete
{
    public class ComplexEntity : IEntity
    {
        public Guid ID { get; set; }
        public ComplexEntityStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
