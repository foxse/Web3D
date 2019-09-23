using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DomainModel;
using DomainModel.ViewModel;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPlant.Controllers
{
	//[Authorize]
	public class ModelController : Controller
    {
        //private static int _bufferModelArraySize = 0;

		private readonly IDataAccessProvider _dataAccessProvider;

		public ModelController(IDataAccessProvider dataAccessProvider)
		{
			_dataAccessProvider = dataAccessProvider;
            //_bufferModelArraySize = _dataAccessProvider.GetBuferModelArraySize();
		}

		// GET: /<controller>/
		public IActionResult Index()
        {
            return View();
        }

		public IActionResult GetModelTree()
		{
			var ent = _dataAccessProvider.GetEntityByName("ProjectTree");
            if (ent == null)
                return PartialView();
            return PartialView((object)ent.Normal);
		}

        public IActionResult GetFullModel()
        {
            var res = _dataAccessProvider.GetFullModel();
            return PartialView("GetModelView", (object)res);
        }

        public IActionResult GetModelView(int take)
        {
            var res = _dataAccessProvider.GetFullModel(take);
            return PartialView((object)res);
        }

        [HttpGet]
        public async Task<IActionResult> AddTo3DView(int id)
		{
            var result = "";
            
            var res = await _dataAccessProvider.GetEntity(id);

            if (res != null)
                result = res.ToJsonString();
            
            return PartialView((object)result);
		}

		[HttpGet]
		public async Task<IActionResult> GetEntitiesArray(int startID, int count)
		{
			var result = "[";

			var res = await _dataAccessProvider.GetEntities(startID, count);

			foreach (var r in res)
			{
				result += r.ToJsonString() + ',';
			}

			result = result.TrimEnd(',') + ']';

			return PartialView("AddTo3DView", result);
		}

		public IActionResult ShowModel()
		{
			return PartialView();
		}

		//public IActionResult RemoveFrom3DView(string items)
		//{
		//	return PartialView();
		//}

        public IActionResult ImportRVM(string file)
        {
            return PartialView((object)file);
        }

		public IActionResult EntityAttributes(int id, string name = "")
		{
			if (id != 0)
			{
				var res = _dataAccessProvider.GetEntityAttributes(id);
				var evm = new EntityViewModel(res);
				return PartialView(evm);
			}
			else
			{
				var res = _dataAccessProvider.GetEntityAttributes(name);
				var evm = new EntityViewModel(res);
				return PartialView(evm);
			}
		}

        public IActionResult GetProjectTree()
        {
            var pt = _dataAccessProvider.GetProjectTree();
            return PartialView(pt);
        }

		public IActionResult TreeNode(int id)
		{
			var tn = _dataAccessProvider.GetProjectTreeNode(id);
			return PartialView(tn);
		}

		public async Task<IActionResult> ShowTreeNode(int treeNodeID) {
			var result = "[";

			var res = await _dataAccessProvider.GetTreeNodeEntities(treeNodeID);

			foreach (var r in res)
			{
				result += r.ToJsonString() + ',';
			}

			result = result.TrimEnd(',') + ']';

			return PartialView("AddTo3DView", result);
		}

		public IActionResult Diagram()
		{
			string file = @"\\vnpmosc52\PDMS\Temp\Sample2.svg";

			if (System.IO.File.Exists(file))
			{
				var svgContent = System.IO.File.ReadAllText(file);

				return View(new Tuple<object, Int32>((object)svgContent, _dataAccessProvider.GetBuferModelArraySize()));
			}
			else
			{
				return View(new Tuple<object, Int32>((object)string.Empty, _dataAccessProvider.GetBuferModelArraySize()));
			}
		}
	}
}
