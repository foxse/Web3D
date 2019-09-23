using System;
using System.Collections.Generic;

namespace DomainModel.Model
{
    public class AttributeInstance
    {
        public long AttributeInstanceId { get; set; }

        public IList<AttributeName> AttributeNames { get; set; }

        public IList<AttributeValue> AttributeValues { get; set; }
    }
}