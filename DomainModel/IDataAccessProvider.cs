using System.Collections.Generic;
using DomainModel.Model;
using System.Threading.Tasks;

namespace DomainModel
{
    public interface IDataAccessProvider
    {
        void AddDataEventRecord(DataEventRecord dataEventRecord);
        void UpdateDataEventRecord(long dataEventRecordId, DataEventRecord dataEventRecord);
        void DeleteDataEventRecord(long dataEventRecordId);
        DataEventRecord GetDataEventRecord(long dataEventRecordId);
        List<DataEventRecord> GetDataEventRecords();
        List<SourceInfo> GetSourceInfos(bool withChildren);
        Task<EntityInstance> GetEntity(int entityInstanceId);
		void UpdateEntity(EntityInstance entity);
		EntityInstance GetEntityByName(string entityName);
		EntityInstance GetEntityAttributes(int entityID);
		EntityInstance GetEntityAttributes(string name);
		void SetAttributeValue(AttributeValue attributeValue);
        Task AddEntityAsync(EntityInstance entity);
		Task<List<EntityInstance>> GetEntities(int startID, int count);
		int GetBuferModelArraySize();
        string GetFullModel();
        string GetFullModel(int take);
        Task<long> AddProjectTreeNode(ProjectTreeNode projectTreeNode);
        ProjectTreeNode GetProjectTree();
		ProjectTreeNode GetProjectTreeNode(long id);
		Task<List<EntityInstance>> GetTreeNodeEntities(long treeNodeID);
	}
}
