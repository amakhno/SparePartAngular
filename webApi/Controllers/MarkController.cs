using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Mark")]
    public class MarkController : Controller
    {
        private readonly IMarkService _markService;
        private readonly IMapper _mapper;

        public MarkController(IMarkService markService, IMapper mapper)
        {
            _markService = markService;
            _mapper = mapper;
        }

        // GET: api/Mark/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(_mapper.Map<Mark, MarkAdminEditViewModel>(_markService.GetById(id)));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/Mark
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Post(MarkAdminEditViewModel value, [FromHeader]string Authorization)
        {
            if (ModelState.IsValid)
            {
                Image image = null;
                if (Request.Form.Files.Count != 0)
                {
                    IFormFile file = Request.Form.Files[0];
                    MemoryStream ms = new MemoryStream();
                    file.OpenReadStream().CopyTo(ms);
                    image = new Image { Name = file.FileName, Data = ms.ToArray(), ContentType = file.ContentType };
                }
                Mark entityModel = _mapper.Map<MarkAdminEditViewModel, Mark>(value);
                var newEntity = _markService.Save(entityModel, image);
                return Ok(newEntity.GetAwaiter().GetResult());
            }
            return BadRequest();
        }

        [HttpPost("[action]")]
        public IActionResult List([FromBody]MarkFilter filter)
        {
            return Ok(_markService.GetList(filter));
        }

        [HttpGet("[action]")]
        public IActionResult ListForSelect()
        {
            return Ok(_markService.GetListForSelect().Select(x => _mapper.Map<Mark, MarksForSelectViewModel>(x)).ToList());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _markService.Delete(id);
            return Ok(true);
        }
    }
}
