using System;

namespace DomainModel.Model
{
    public class DoubleHistoryValue
    {
        public DoubleHistoryValue()
        {
        }

        public DoubleHistoryValue(double value)
        {
            Value = value;
        }

        public long DoubleHistoryValueId { get; set; }
        public double Value { get; set; }

        public AttributeHistoryValue AttributeHistoryValue { get; set; }
    }
}