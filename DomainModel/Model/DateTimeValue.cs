using System;

namespace DomainModel.Model
{
    public class DateTimeValue
    {
        public DateTimeValue()
        {
        }

        public DateTimeValue(DateTime value)
        {
            Value = value;
        }

        public long DateTimeValueId { get; set; }
        public DateTime Value { get; set; }

        public AttributeValue AttributeValue { get; set; }
    }
}