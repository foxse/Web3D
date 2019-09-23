using DomainModel.Model;
using System.Collections.Generic;
using System.Linq;

namespace DomainModel.ViewModel
{
    public class EntityViewModel
    {
		public EntityViewModel()
		{

		}

		public EntityViewModel(EntityInstance entity)
		{
            if (entity != null)
            {
                ID = entity.EntityInstanceId;
                Name = entity.Name;
                Attributes = entity.AttributeValues
                    .ToDictionary(a => a.AttributeInstance.AttributeNames.FirstOrDefault().Description,
                        a => new AttributeValue()
                        {
                            AttributeValueId = a.AttributeValueId,
                            IntegerValue = a.IntegerValue,
                            DoubleValue = a.DoubleValue,
                            TextValue = a.TextValue
                        });
            }
		}

		public int ID { get; set; }

		public string Name { get; set; }

		public Dictionary<string, AttributeValue> Attributes { get; set; } 
    }
}
