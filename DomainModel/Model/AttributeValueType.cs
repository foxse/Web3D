using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel.Model
{
    public class AttributeValueType
    {
        [Key]
        private string attributeValueTypeId;
        public string AttributeValueTypeId { get { return attributeValueTypeId; } set { attributeValueTypeId = value.ToUpper(); } }
        
        public List<AttributeValue> AttributeValues { get; set; }
    }
}
