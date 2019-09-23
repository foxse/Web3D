using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel.Model
{
    public class TextHistoryValue
    {
        public TextHistoryValue()
        {
        }

        public TextHistoryValue(string value)
        {
            Value = value;
        }

        public long TextHistoryValueId { get; set; }
        public string Value { get; set; }

        public AttributeHistoryValue AttributeHistoryValue { get; set; }
    }
}
