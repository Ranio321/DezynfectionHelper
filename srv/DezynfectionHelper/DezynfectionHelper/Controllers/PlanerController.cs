using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezynfectionHelper.Planer.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DezynfectionHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanerController : ControllerBase
    {

        [HttpPost]
        public string Save([FromBody] PlanerItems items)
        {
            return "value";
        }

        [HttpGet]
        public string Get([FromQuery] int id)
        {
            return "da";
        }

        [HttpGet]
        public string GetAll()
        {
            return "da";
        }
    }
}
