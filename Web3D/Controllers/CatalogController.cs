using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using io = System.IO;
//using DataAccessPostgreSqlProvider;
using DomainModel;
using DomainModel.Model;

using DataAccessMsSqlServerProvider;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPlant.Controllers
{
    public class CatalogController : Controller
    {
        const string InitPath = @"E:\Static\";
        
		private static string _currentPath = @"E:\Static\";

		private readonly IDataAccessProvider _dataAccessProvider;

		public CatalogController(IDataAccessProvider dataAccessProvider)
		{
			_dataAccessProvider = dataAccessProvider;
		}

		// GET: /<controller>/
		public IActionResult Index()
        {
            return View();
        }

		public IActionResult UploadGeometry(string json)
		{
            var fullPath = _currentPath + json;
            if (!io.Directory.Exists(fullPath))
            {

            }
            else
            {
                io.Directory.CreateDirectory(fullPath);
            }
            //io.Directory.CreateDirectory()
			return new EmptyResult();
		}

        public IActionResult CreateElement(string name)
        {
            var cp = _currentPath;
            cp += name.GetHashCode();
            if (io.Directory.Exists(cp))
            {

            }
            else
            {
                io.Directory.CreateDirectory(cp);
            }
			//io.Directory.CreateDirectory()
			_currentPath = cp;
            return new EmptyResult();
        }

        public IActionResult CreateGroup(string name)
        {
            var cp = _currentPath + name.GetHashCode();
            if (io.Directory.Exists(cp))
            {

            }
            else
            {
                io.Directory.CreateDirectory(cp);
            }
            cp += '\\';
			_currentPath = cp;
            //io.Directory.CreateDirectory()
            return new EmptyResult();
        }

        public IActionResult MoveToUpperGroup()
        {
            var spl = _currentPath.Split('\\');
            var cp = "";
            for (int i = 0; i < spl.Length - 1; i++)
            {
                cp += spl[i] + "\\";
            }
			_currentPath = cp;
            return new EmptyResult();
        }

		[HttpPost]
		public IActionResult SaveModel(string json)
		{
			

			return new EmptyResult();
		}

		[HttpPost]
		public async Task<IActionResult> SaveMesh(string json)
		{
            try
            {
                var entity = Newtonsoft.Json.JsonConvert.DeserializeObject<EntityInstance>(json);
                entity.EntityInstanceId = 0;
                await _dataAccessProvider.AddEntityAsync(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
			
			return new EmptyResult();
		}

		[HttpPost]
		public async Task<IActionResult> UpdatEntity(string json)
		{
			var entity = Newtonsoft.Json.JsonConvert.DeserializeObject<EntityInstance>(json);
			if (entity.EntityInstanceId != 0)
				_dataAccessProvider.UpdateEntity(entity);

			return new EmptyResult();
		}

		public async Task<IActionResult> FixProjectTree()
		{
			var entity = _dataAccessProvider.GetEntityByName("ProjectTree");

			for (int i = 1; i < entity.EntityInstanceId; i++)
			{
				var e = await _dataAccessProvider.GetEntity(i);
				//entity.Normal = entity.Normal.Replace(e.Name,
			}

			return new EmptyResult();
		}

        /// ToDO! Add value type switch
        public IActionResult SetAttribute(int id, string name, string value, string type)
        {
            var attVal = new AttributeValue() {
                EntityInstanceId = id,
                AttributeInstance = new AttributeInstance() {
                    AttributeNames = new List<AttributeName>() { new AttributeName(name) }
                },
                TextValue = new TextValue(value)
            };

            _dataAccessProvider.SetAttributeValue(attVal);
            
            return new EmptyResult();
        }

		public async Task<IActionResult> ImportRVM(string file)
		{

			var currentObjectName = "";
			var modelArr = System.IO.File.ReadAllLines(@"D:\" + file);

            ProjectTreeNode currentNode = null;

			for (int k = 0; k < modelArr.Length; k++)
			{
                if (modelArr[k] == "CNTB")
                {
                    var pnr = new ProjectTreeNode();
                    pnr.Parent = currentNode;
                    pnr.Name = modelArr[k + 2];
                    pnr.Childs = new List<ProjectTreeNode>();
                    if (currentNode != null)
                        currentNode.Childs.Add(pnr);
                    pnr.ProjectTreeNodeID = await _dataAccessProvider.AddProjectTreeNode(pnr);
                    currentNode = pnr;

                    
                }
				else if (modelArr[k] == "PRIM")
					{
						var grPosArr = "";
						if (modelArr[k - 5] == "CNTB")
						{
							grPosArr = modelArr[k - 2];
							if (modelArr[k + 9] == "CNTB")
							{
								currentObjectName = (modelArr[k - 3]);
							}
							else
							{
								currentObjectName = (modelArr[k - 3]);
							}
						}

						//var textArray = new List<string>();
						string textArray = "";

						if (modelArr[k + 2] != "    11")
						{
							for (int l = k + 2; l < k + 9; l++)
							{
								textArray += (modelArr[l]) + '|';
							}

						}
						else
						{
							var l = k + 2;
							while (modelArr[l] != "CNTE")
							{
								textArray += (modelArr[l]) + '|';
								l++;
							}

							//var mesh = createMeshFromPrim(textArray, material, grPosArr);
							//mesh.receiveShadow = true;

						}

						try
						{
							var entity = new EntityInstance(0);
							entity.Name = currentObjectName;
							entity.Position = textArray.TrimEnd('|');
							entity.Normal = grPosArr;
							await _dataAccessProvider.AddEntityAsync(entity);
						}
						catch (Exception ex)
						{
							Console.WriteLine(ex.ToString());
						}
					}
					else if (modelArr[k] == "CNTE")
                {
                    currentNode = currentNode.Parent;
                }
            }

			return new EmptyResult();
		}
	}
}
