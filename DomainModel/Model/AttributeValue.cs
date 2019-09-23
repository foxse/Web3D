using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Model
{
    public class AttributeValue
    {
        public AttributeValue()
        {
            AttributeHistoryValues = new List<AttributeHistoryValue>();
        }

        [Key]
        public long AttributeValueId { get; set; }

        public int EntityInstanceId { get; set; }
        public EntityInstance EntityInstance { get; set; }

        public long AttributeInstanceId { get; set; }
        public AttributeInstance AttributeInstance { get; set; }

        public string AttributeValueTypeId { get; set; }
        public AttributeValueType AttributeValueType { get; set; }

        public long? DateTimeValueId { get; set; }
        public DateTimeValue DateTimeValue { get; set; }

        public long? DoubleValueId { get; set; }
        public DoubleValue DoubleValue { get; set; }

        public long? IntegerValueId { get; set; }
        public IntegerValue IntegerValue { get; set; }

        public long? TextValueId { get; set; }
        public TextValue TextValue { get; set; }

        public virtual ICollection<AttributeHistoryValue> AttributeHistoryValues { get; set; }

        public DateTime UpdatedTimestamp { get; set; }

        public long? ModifiedByUserId { get; set; }
    }
}