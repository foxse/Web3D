using System.ComponentModel.DataAnnotations;

namespace DomainModel.Model
{
    public class EntityName
    {
        [Key]
        private string entityNameId;
        public string EntityNameId { get { return entityNameId; } set { entityNameId = value.ToUpper(); } }

        public EntityName()
        {
        }

        public EntityName(string entityName)
        {
            entityNameId = entityName.ToUpper();
        }

        public string Description { get; set; }

        public int EntityInstanceId { get; set; }
        public EntityInstance EntityInstance { get; set; }
    }
}
