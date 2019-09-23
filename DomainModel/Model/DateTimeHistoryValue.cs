using System;

namespace DomainModel.Model
{
    public class DateTimeHistoryValue
    {
        public DateTimeHistoryValue()
        {
        }

        public DateTimeHistoryValue(DateTime value)
        {
            Value = value;
        }

        public long DateTimeHistoryValueId { get; set; }
        public DateTime Value { get; set; }

        public AttributeHistoryValue AttributeHistoryValue { get; set; }
    }
}