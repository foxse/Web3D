using System;
using System.Collections.Generic;
using System.Linq;
using DomainModel;
using DomainModel.Model;
//using IFC4dataModel.NETCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace DataAccessMsSqlServerProvider
{
    public class DataAccessMsSqlServerProvider : IDataAccessProvider
    {
        private readonly DomainModelMsSqlServerContext _context;
        private readonly ILogger _logger;

        public DataAccessMsSqlServerProvider(DomainModelMsSqlServerContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("DataAccessMsSqlServerProvider");
        }

        public void AddDataEventRecord(DataEventRecord dataEventRecord)
        {
            if (dataEventRecord.SourceInfo != null && dataEventRecord.SourceInfoId == 0)
            {
                _context.SourceInfos.Add(dataEventRecord.SourceInfo);
            }

            _context.DataEventRecords.Add(dataEventRecord);
            _context.SaveChanges();
        }

        public void UpdateDataEventRecord(long dataEventRecordId, DataEventRecord dataEventRecord)
        {
            _context.DataEventRecords.Update(dataEventRecord);
            _context.SaveChanges();
        }

        public void DeleteDataEventRecord(long dataEventRecordId)
        {
            var entity = _context.DataEventRecords.First(t => t.DataEventRecordId == dataEventRecordId);
            _context.DataEventRecords.Remove(entity);
            _context.SaveChanges();
        }

        public DataEventRecord GetDataEventRecord(long dataEventRecordId)
        {
            return _context.DataEventRecords.FirstOrDefault(t => t.DataEventRecordId == dataEventRecordId);
        }

        public List<DataEventRecord> GetDataEventRecords()
        {
            // Using the shadow property EF.Property<DateTime>(dataEventRecord)
            return _context.DataEventRecords.OrderByDescending(dataEventRecord => EF.Property<DateTime>(dataEventRecord, "UpdatedTimestamp")).ToList();
        }

        public List<SourceInfo> GetSourceInfos(bool withChildren)
        {
            // Using the shadow property EF.Property<DateTime>(srcInfo)
            if (withChildren)
            {
                return _context.SourceInfos.Include(s => s.DataEventRecords).OrderByDescending(srcInfo => EF.Property<DateTime>(srcInfo, "UpdatedTimestamp")).ToList();
            }

            return _context.SourceInfos.OrderByDescending(srcInfo => EF.Property<DateTime>(srcInfo, "UpdatedTimestamp")).ToList();
        }

        public async Task<EntityInstance> GetEntity(int entityInstanceId)
        {
            //var newWnt = new EntityInstance("4200-3505-P09");

            //var an = new AttributeName("Diameter") { Description = "En" };

            //var ai = new AttributeInstance() { AttributeNames = new List<AttributeName>() { an } };

            //AttributeValue av = new AttributeValue() { AttributeInstance = ai, EntityInstanceId = newWnt.EntityInstanceId, DoubleValue = new DoubleValue(200d) };

            //an.AttributeInstance = ai;

            //_context.AttributeNames.Add(an);
            //_context.EntityInstances.Add(newWnt);
            //_context.AttributeValues.Add(av);

            //_context.SaveChanges();
            var ents = await _context.EntityInstances
                .Where(e => e.EntityInstanceId == entityInstanceId)
                .ToListAsync();
            if (ents.Count > 0)
                return ents[0];
            else
                return null;
        }

		public async Task<List<EntityInstance>> GetEntities(int startID, int count)
		{
			var c = startID + count;
			var ents = await _context.EntityInstances
				.Where(e => e.EntityInstanceId >= startID && e.EntityInstanceId <= c && e.Position != null && e.Position != "")
				.ToListAsync();
			
			return ents;
		}

		public EntityInstance GetEntityByName(string entityName)
        {
            var ent = _context.EntityInstances
                .Where(e => e.Name == entityName)
                .Select(e => new EntityInstance()
                {
                    Name = e.Name,
                    Position = e.Position,
                    Normal = e.Normal,
                    Uv = e.Uv,
                    AttributeValues = e.AttributeValues.Select(v => new AttributeValue()
                    {
                        EntityInstanceId = v.EntityInstanceId,
                        //AttributeHistoryValues = v.AttributeHistoryValues.ToList(),
                        TextValue = v.TextValue,
                        DoubleValue = v.DoubleValue,
                        DateTimeValue = v.DateTimeValue,
                        IntegerValue = v.IntegerValue,
                        AttributeInstance = new AttributeInstance() { AttributeNames = v.AttributeInstance.AttributeNames }
                    }).ToList()
                }).FirstOrDefault();
            return ent;
        }

        public void SetAttributeValue(AttributeValue attributeValue)
        {
            var attName = attributeValue.AttributeInstance.AttributeNames.FirstOrDefault() ;
            var name = (attName != null)?attName.AttributeNameId:"";

            var attInstance = GetAttributeInstance(name);

            if (attInstance == null)
            {
                var newAttInstance = new AttributeInstance() {
                    AttributeNames = new List<AttributeName>() { new AttributeName(name) },
                    AttributeValues = new List<AttributeValue>() { attributeValue }
                };

                _context.AttributeInstances.Add(newAttInstance);
                _context.SaveChanges();
            }
            else
            {
                var attVal = _context.AttributeValues
                    .Where(av => av.AttributeInstance.AttributeInstanceId == attInstance.AttributeInstanceId
                        && av.EntityInstanceId == attributeValue.EntityInstanceId)
                    .Select(av => new AttributeValue()
                    {
                        AttributeInstanceId = av.AttributeInstanceId,
                        AttributeInstance = av.AttributeInstance,
                        EntityInstance = av.EntityInstance,
                        EntityInstanceId = av.EntityInstanceId,
                        AttributeValueId = av.AttributeValueId,
                        AttributeValueTypeId = av.AttributeValueTypeId,
                        DateTimeValue = (av.DateTimeValue == null) ? null : av.DateTimeValue,
                        DoubleValue = (av.DoubleValue == null) ? null : av.DoubleValue,
                        IntegerValue = (av.IntegerValue == null) ? null : av.IntegerValue,
                        TextValue = (av.TextValue == null) ? null : av.TextValue,
                        AttributeHistoryValues = av.AttributeHistoryValues,
                        ModifiedByUserId = av.ModifiedByUserId
                    })
                    .SingleOrDefault();

                

				if (attVal == null)
				{
					attVal = new AttributeValue()
					{
						AttributeInstanceId = attInstance.AttributeInstanceId,
						EntityInstanceId = attributeValue.EntityInstanceId,
						DateTimeValue = (attributeValue.DateTimeValue == null) ? null : attributeValue.DateTimeValue,
						DoubleValue = (attributeValue.DoubleValue == null) ? null : attributeValue.DoubleValue,
						IntegerValue = (attributeValue.IntegerValue == null) ? null : attributeValue.IntegerValue,
						TextValue = (attributeValue.TextValue == null) ? null : attributeValue.TextValue,
						AttributeHistoryValues = attributeValue.AttributeHistoryValues,
						ModifiedByUserId = attributeValue.ModifiedByUserId
					};
					_context.AttributeValues.Add(attVal);
					_context.SaveChanges();
					return;
				}
				attVal = ApplyValue(attVal, attributeValue);

				// _context.Attach(attVal);

				_context.AttributeValues.Update(attVal);
                _context.SaveChanges();
            }
        }

		public EntityInstance GetEntityAttributes(int entityID)
		{
			var ent = _context.EntityInstances
				.Where(e => e.EntityInstanceId == entityID)
				.Select(e => new EntityInstance()
				{
					EntityInstanceId = e.EntityInstanceId,
					Name = e.Name,
					//Position = e.Position,
					//Normal = e.Normal,
					//Uv = e.Uv,
					AttributeValues = e.AttributeValues.Select(v => new AttributeValue()
					{
						EntityInstanceId = v.EntityInstanceId,
						//AttributeHistoryValues = v.AttributeHistoryValues.ToList(),
						TextValue = v.TextValue,
						DoubleValue = v.DoubleValue,
						DateTimeValue = v.DateTimeValue,
						IntegerValue = v.IntegerValue,
						AttributeInstance = new AttributeInstance() { AttributeNames = v.AttributeInstance.AttributeNames }
					}).ToList()
				}).FirstOrDefault();
			return ent;
		}

		public EntityInstance GetEntityAttributes(string name)
		{
			var ent = _context.EntityInstances
				.Where(e => e.Name == name)
				.Select(e => new EntityInstance()
				{
					EntityInstanceId = e.EntityInstanceId,
					Name = e.Name,
					//Position = e.Position,
					//Normal = e.Normal,
					//Uv = e.Uv,
					AttributeValues = e.AttributeValues.Select(v => new AttributeValue()
					{
						EntityInstanceId = v.EntityInstanceId,
						//AttributeHistoryValues = v.AttributeHistoryValues.ToList(),
						TextValue = v.TextValue,
						DoubleValue = v.DoubleValue,
						DateTimeValue = v.DateTimeValue,
						IntegerValue = v.IntegerValue,
						AttributeInstance = new AttributeInstance() { AttributeNames = v.AttributeInstance.AttributeNames }
					}).ToList()
				}).FirstOrDefault();
            if (ent == null)
            {
                ent = _context.EntityInstances.Add(new EntityInstance() {
                    Name = name,
                }).Entity;
                _context.SaveChanges();
                ent.AttributeValues = new List<AttributeValue>(0);
            }

            return ent;
		}

		public AttributeValue ApplyValue(AttributeValue attVal, AttributeValue attributeValue)
        {
            switch (attVal.AttributeValueTypeId)
            {
                case "DATETIME":
                    if (attVal.DateTimeValue == attributeValue.DateTimeValue)
                        return null;
                    attVal.AttributeHistoryValues.Add(new AttributeHistoryValue(attVal.DateTimeValue.Value, attVal.ModifiedByUserId));
                    attVal.DateTimeValue.Value = attributeValue.DateTimeValue.Value;
                    break;
                case "TEXT":
                    if (attVal.TextValue.Value == attributeValue.TextValue.Value)
                        return null;
                    attVal.AttributeHistoryValues.Add(new AttributeHistoryValue(attVal.TextValue.Value, attVal.ModifiedByUserId));
                    attVal.TextValue.Value = attributeValue.TextValue.Value;
                    break;
                case "INTEGER":
                    if (attVal.TextValue.Value == attributeValue.TextValue.Value)
                        return null;
                    attVal.AttributeHistoryValues.Add(new AttributeHistoryValue(attVal.IntegerValue.Value, attVal.ModifiedByUserId));
                    attVal.TextValue.Value = attributeValue.TextValue.Value;
                    break;
                case "DOUBLE":
                    if (attVal.DoubleValue.Value == attributeValue.DoubleValue.Value)
                        return null;
                    attVal.AttributeHistoryValues.Add(new AttributeHistoryValue(attVal.DoubleValue.Value, attVal.ModifiedByUserId));
                    attVal.DoubleValue.Value = attributeValue.DoubleValue.Value;
                    break;
                default:
                    if (attVal.TextValue.Value == attributeValue.TextValue.Value)
                        return null;
                    attVal.AttributeHistoryValues.Add(new AttributeHistoryValue(attVal.TextValue.Value, attVal.ModifiedByUserId));
                    attVal.TextValue.Value = attributeValue.TextValue.Value;
                    break;
            }



            return attVal;
        }

        public int GetBuferModelArraySize()
        {
            int count = 0;
            var elems = _context.EntityInstances.Select(e => e.Position);
            foreach (var item in elems)
            {
                if (item != null)
                    count += item.Split(',').Length;
            }
            return count;
        }

        public AttributeInstance GetAttributeInstance(string name)
        {
            return _context.AttributeNames
                .Where(ain => ain.AttributeNameId == name)
                .Select(ain => ain.AttributeInstance).SingleOrDefault();
        }

        public EntityInstance GetEntityInstance(string name)
        {
            return _context.EntityNames
                .Where(ein => ein.EntityNameId == name)
                .Select(ein => ein.EntityInstance).SingleOrDefault();
        }

        public async Task AddEntityAsync(EntityInstance entity)
        {
			string cmdString = "INSERT INTO [EntityInstances] ([ModifiedByUserId], [Name], [Normal], [Position], [UpdatedTimestamp], [Uv])\r\nVALUES (@p0, @p1, @p2, @p3, @p4, @p5);";
			//string connString = "Data Source=vnpmosa65\\aie;Initial Catalog=WebPlantRVM;Integrated Security=True;";
            string connString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Web3D;Integrated Security=True;";
			using (SqlConnection conn = new SqlConnection(connString))
			{
				using (SqlCommand comm = new SqlCommand())
				{
					comm.Connection = conn;
					comm.CommandText = cmdString;
					comm.Parameters.AddWithValue("@p0", entity.ModifiedByUserId);
					comm.Parameters.AddWithValue("@p1", entity.Name);
					comm.Parameters.AddWithValue("@p2", (entity.Normal != null) ? entity.Normal : "");
					comm.Parameters.AddWithValue("@p3", (entity.Position != null) ? entity.Position : "");
					comm.Parameters.AddWithValue("@p4", DateTime.Now);
					comm.Parameters.AddWithValue("@p5", (entity.Uv != null) ? entity.Uv : "");
					try
					{
						conn.Open();
						comm.ExecuteNonQuery();
					}
					catch (SqlException e)
					{
						Console.WriteLine(e.ToString());
						// do something with the exception
						// don't hide it
					}
				}
			}
			//await _context.EntityInstances.AddAsync(entity);
   //         await _context.SaveChangesAsync();
        }

		public void UpdateEntity(EntityInstance entity)
		{
			_context.EntityInstances.Update(entity);
			_context.SaveChanges();
		}

        public string GetFullModel()
        {
            var result = "[";

            var ents = _context.EntityInstances.Where(e => e.Position != null && e.Position != "").Select(e => e.EntityInstanceId);
            foreach (var ent in ents)
            {
                result += "\"" + ent + "\",";
            }
            result = result.TrimEnd(',') + "]";
            return result;
        }

        public string GetFullModel(int take)
        {
            var result = "[";
            
            var ents = _context.EntityInstances.Where(e => e.Position != null && e.Position != "").Select(e => e.EntityInstanceId).Take(take);
            foreach (var ent in ents)
            {
                result += "\"" + ent + "\",";
            }
            result = result.TrimEnd(',') + "]";
            return result;
        }

        public async Task<long> AddProjectTreeNode(ProjectTreeNode projectTreeNode)
        {
            var ae = await _context.ProjectTree.AddAsync(projectTreeNode);
            await _context.SaveChangesAsync();
            return ae.Entity.ProjectTreeNodeID;
        }

        public ProjectTreeNode GetProjectTree()
        {
            var ptn = _context.ProjectTree.Where(e => e.ProjectTreeNodeID == 1).SingleOrDefault();
            ptn.Childs = LoadAllProjectTreeNodeChilds(ptn);

            return ptn;
        }

        private List<ProjectTreeNode> LoadProjectTreeNodeChilds(ProjectTreeNode ptn)
        {
            ptn.Childs = _context.ProjectTree.Where(e => e.ParentProjectTreeNodeID == ptn.ProjectTreeNodeID).ToList();

            return ptn.Childs.ToList();
        }

		private List<ProjectTreeNode> LoadAllProjectTreeNodeChilds(ProjectTreeNode ptn)
		{
			ptn.Childs = _context.ProjectTree.Where(e => e.ParentProjectTreeNodeID == ptn.ProjectTreeNodeID).ToList();
			foreach (var c in ptn.Childs)
			{
				c.Childs = LoadProjectTreeNodeChilds(c);
			}
			return ptn.Childs.ToList();
		}

		public ProjectTreeNode GetProjectTreeNode(long id)
		{
			var ptn = _context.ProjectTree.Where(e => e.ProjectTreeNodeID == id).SingleOrDefault();
			ptn.Childs = LoadProjectTreeNodeChilds(ptn);

            foreach (var c in ptn.Childs)
            {
                LoadProjectTreeNodeChilds(c);
            }

			return ptn;
		}

		public async Task<List<EntityInstance>> GetTreeNodeEntities(long treeNodeID)
		{
			var result = new List<EntityInstance>();

			List<string> entNames = new List<string>();

			var fullTreeNode = GetProjectTreeNode(treeNodeID);

			if (fullTreeNode == null)
				return result;

			LoadProjectTreeNodeEntitys(fullTreeNode, ref entNames);

			result = await _context.EntityInstances.Where(e => entNames.Contains(e.Name) && e.Position != null).ToListAsync();

			return result;
		}

		private void LoadProjectTreeNodeEntitys(ProjectTreeNode ptn, ref List<string> entNames)
		{
			entNames.Add(ptn.Name);
			ptn.Childs = LoadProjectTreeNodeChilds(ptn);

			foreach (var c in ptn.Childs)
			{
				entNames.Add(c.Name);
				LoadProjectTreeNodeEntitys(c, ref entNames);
			}

		}

		
	}
}
