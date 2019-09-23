using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DomainModel.Model
{
	public class ProjectTreeNode
    {
		[Key]
		public long ProjectTreeNodeID { get; set; }
		public long ParentProjectTreeNodeID { get; set; }

		public string Name { get; set; }
		public string GUID { get; set; }

        public ProjectTreeNode Parent { get; set; }

        public virtual IList<ProjectTreeNode> Childs { get; set; }
    }
}
