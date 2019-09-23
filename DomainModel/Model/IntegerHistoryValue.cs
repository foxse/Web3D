using System;

namespace DomainModel.Model
{
    public class IntegerHistoryValue
    {
        public IntegerHistoryValue()
        {
        }

        public IntegerHistoryValue(int value)
        {
            Value = value;
        }

        public long IntegerHistoryValueId { get; set; }
        public int Value { get; set; }

        public AttributeHistoryValue AttributeHistoryValue { get; set; }
    }
}