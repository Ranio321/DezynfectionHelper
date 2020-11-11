using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezynfectionHelper.NHibernate.Services;
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
        private readonly IPlanerRepository repo;
        private readonly IUnitOfWork uow;

        public PlanerController(IPlanerRepository repo, IUnitOfWork uow)
        {
            this.repo = repo;
            this.uow = uow;
        }

        [HttpPost]
        public async Task Save([FromBody] PlanerItemsParams param)
        {
            await repo.AddAsync(param);
            await uow.CommitAsync();
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
