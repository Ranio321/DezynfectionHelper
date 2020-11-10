using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
using DezynfectionHelper.Planer.Repositories;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace DezynfectionHelper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlanerController : ControllerBase
    {
        private IPlanerRepository repo;

        public PlanerController(IPlanerRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public async Task Save([FromBody] PlanerItemsParams param)
        {
            await repo.AddAsync(param);
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
