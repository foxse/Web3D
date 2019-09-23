using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainModel.Model
{
    public class EntityInstance
    {
        public EntityInstance()
        { }

        public EntityInstance(int id)
        {
            EntityInstanceId = id;
        }

 //       [Column(TypeName = "nvarchar(max)")]
        public string Name { get; set; }
  //      [Column(TypeName = "nvarchar(max)")]
        public string Position { get; set; }
  //      [Column(TypeName = "nvarchar(max)")]
        public string Normal { get; set; }
   //     [Column(TypeName = "nvarchar(max)")]
        public string Uv { get; set; }

        [Key]
        public int EntityInstanceId { get; set; }

        public long ModifiedByUserId { get; set; }

        public DateTime UpdatedTimestamp { get; set; }

        public IList<AttributeValue> AttributeValues { get; set; }

        public IList<EntityName> EntityNames { get; set; }

        public string ToJsonString()
        {
            var result = "{\"name\":" + "\"" + Name + "\"," +
                "\"id\":" + EntityInstanceId + "," +
                "\"position\":\"" + Position + "\"," +
                "\"normal\":\"" + Normal + "\"," +
				"\"uv\":\"" + Uv + "\"}";
            return result;
        }
    }
}
