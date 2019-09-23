using System;

namespace DomainModel.Model
{
    public class IntegerValue
    {
        public IntegerValue()
        {
        }

        public IntegerValue(int value)
        {
            Value = value;
        }

        public long IntegerValueId { get; set; }
        public int Value { get; set; }

        public AttributeValue AttributeValue { get; set; }
    }
}