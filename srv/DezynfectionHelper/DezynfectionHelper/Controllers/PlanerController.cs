using System.Collections.Generic;
using System.Threading.Tasks;
using DezynfectionHelper.NHibernate.Services;
using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
using DezynfectionHelper.Planer.Repositories;
using Microsoft.AspNetCore.Mvc;

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
            var planerItems = new PlanerItems()
            {
                Name = param.Name,
                Objects = param.Objects,
                Room = param.Room,
            };

            await repo.AddAsync(planerItems);
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<PlanerItems> Get([FromQuery] int id)
        {
            return await repo.GetByIdAsync(id);
        }

        [HttpGet]
        public async Task<List<PlanerItems>> GetAll()
        {
            return await repo.GetAllAsync();
        }

        [HttpDelete]
        public async Task Delete([FromQuery]int id)
        {
            await repo.DeleteAsync(id);
            await uow.CommitAsync();
        }

        [HttpPut]
        public async Task Update([FromBody] PlanerItemsParams param)
        {
            var planerItems = new PlanerItems()
            {
                Name = param.Name,
                Objects = param.Objects,
                Room = param.Room,
                Id = (int)param.Id,
            };

            await repo.UpdateAsync(planerItems);
            await uow.CommitAsync();
        }
    }
}
