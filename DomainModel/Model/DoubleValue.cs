using System;

namespace DomainModel.Model
{
    public class DoubleValue
    {
        public DoubleValue()
        {
        }

        public DoubleValue(double value)
        {
            Value = value;
        }

        public long DoubleValueId { get; set; }
        public double Value { get; set; }

        public AttributeValue AttributeValue { get; set; }
    }
}