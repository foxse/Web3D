using System;

namespace DomainModel.Model
{
    public class TextValue
    {
        public TextValue()
        {
        }

        public TextValue(string value)
        {
            Value = value;
        }

        public long TextValueId { get; set; }
        public string Value { get; set; }

        public AttributeValue AttributeValue { get; set; }
    }
}