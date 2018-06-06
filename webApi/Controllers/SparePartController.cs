using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/SparePart")]
    public class SparePartController : Controller
    {
        private readonly ISparePartService _sparePartService;
        private readonly IMapper _mapper;

        public SparePartController(ISparePartService sparePartService, IMapper mapper)
        {
            _sparePartService = sparePartService;
            _mapper = mapper;
        }

        // GET: api/Mark/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(_mapper.Map<SparePart, SparePartAdminEditViewModel>(_sparePartService.GetById(id)));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/Mark
        [HttpPost]
        public IActionResult Post([FromBody]SparePartAdminEditViewModel value)
        {
            if (ModelState.IsValid)
            {
                Image image = null;
                if (!String.IsNullOrEmpty(value.ImageBase64))
                {
                    string dataType = value.ImageBase64.Substring(5, value.ImageBase64.IndexOf(";") - 5);
                    byte[] bytes = Convert.FromBase64String(value.ImageBase64.Substring(value.ImageBase64.IndexOf("base64,") + 7));
                    using (MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length))
                    {
                        ms.Write(bytes, 0, bytes.Length);
                        image = new Image { Name = value.ImageName, Data = ms.ToArray(), ContentType = dataType };
                    }
                }
                SparePart entityModel = _mapper.Map<SparePartAdminEditViewModel, SparePart>(value);
                var newEntity = _sparePartService.Post(entityModel, image);
                return Ok(newEntity);
            }
            return BadRequest();
        }

        // PUT: api/Mark/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]SparePartAdminEditViewModel value, int id)
        {
            if (ModelState.IsValid)
            {
                value.Id = id;
                Image image = null;
                if (!String.IsNullOrEmpty(value.ImageBase64))
                {
                    string dataType = value.ImageBase64.Substring(5, value.ImageBase64.IndexOf(";") - 5);
                    byte[] bytes = Convert.FromBase64String(value.ImageBase64.Substring(value.ImageBase64.IndexOf("base64,") + 7));
                    using (MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length))
                    {
                        ms.Write(bytes, 0, bytes.Length);
                        image = new Image { Name = value.ImageName, Data = ms.ToArray(), ContentType = dataType };
                    }
                }
                SparePart entityModel = _mapper.Map<SparePartAdminEditViewModel, SparePart>(value);
                var newEntity = _sparePartService.Put(entityModel, image);
                return Ok(newEntity);
            }
            return BadRequest();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _sparePartService.Delete(id);
            return Ok(true);
        }

        [HttpPost("[action]")]
        public IActionResult List([FromBody]SparePartFilter filter)
        {
            return Ok(_sparePartService.GetList(filter));
        }

        [HttpPost("[action]")]
        public IActionResult ListForUsers([FromBody]SparePartFilter filter)
        {
            SparePartListForUsers list = new SparePartListForUsers();
            var listFromDb = _sparePartService.GetList(filter);
            list.PagesCount = listFromDb.PagesCount;
            list.SpareParts = listFromDb.SpareParts.Select(x =>_mapper.Map<SparePartForUsers>(x));
            return Ok(list);
        }
    }
}
