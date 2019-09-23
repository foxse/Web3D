using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomainModel.Model
{
    public class AttributeName
    {
        [Key]
        private string attributeNameId;

        public AttributeName(string attributeName)
        {
            attributeNameId = attributeName.ToUpper();
			Description = attributeName;
        }

        public AttributeName()
        {
        }

        public string AttributeNameId { get { return attributeNameId; } set { attributeNameId = value.ToUpper(); } }

        public string Description { get; set; }

        public long AttributeInstanceId { get; set; }
        public AttributeInstance AttributeInstance { get; set; }
    }
}
