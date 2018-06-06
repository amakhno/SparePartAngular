using System.Collections.Generic;
using System.Linq;
using EntityFramework;
using Microsoft.AspNetCore.Mvc;
using DataModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly IMapper _mapper;

        public ValuesController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            EntityFrameworkContext context = new EntityFrameworkContext();
            var test = context.Models.Include(x=>x.Mark);
            return test.Select(x=>x.Mark.Name + " " + x.Name + "!");//test.Select(x=>x.Mark.Name + " " + x.Name);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
