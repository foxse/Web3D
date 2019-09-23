using System;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Model
{
    public class AttributeHistoryValue
    {
        public AttributeHistoryValue()
        {
        }

        public AttributeHistoryValue(DateTime value, long? modifiedByUserId)
        {
            DateTimeHistoryValue = new DateTimeHistoryValue(value);
            ModifiedByUserId = modifiedByUserId;
        }

        public AttributeHistoryValue(string value, long? modifiedByUserId)
        {
            TextHistoryValue = new TextHistoryValue(value);
            ModifiedByUserId = modifiedByUserId;
        }

        public AttributeHistoryValue(double value, long? modifiedByUserId)
        {
            DoubleHistoryValue = new DoubleHistoryValue(value);
            ModifiedByUserId = modifiedByUserId;
        }

        public AttributeHistoryValue(int value, long? modifiedByUserId)
        {
            IntegerHistoryValue = new IntegerHistoryValue(value);
            ModifiedByUserId = modifiedByUserId;
        }

        public long AttributeHistoryValueId { get; set; }

        public long? DateTimeHistoryValueId { get; set; }
        public DateTimeHistoryValue DateTimeHistoryValue { get; set; }

        public long? DoubleHistoryValueId { get; set; }
        public DoubleHistoryValue DoubleHistoryValue { get; set; }

        public long? IntegerHistoryValueId { get; set; }
        public IntegerHistoryValue IntegerHistoryValue { get; set; }

        public long? TextHistoryValueId { get; set; }
        public TextHistoryValue TextHistoryValue { get; set; }

        public DateTime UpdatedTimestamp { get; set; }

        public long? ModifiedByUserId { get; set; }

        public long AttributeValueId { get; set; }
        public virtual AttributeValue AttributeValue { get; set; }
    }
}