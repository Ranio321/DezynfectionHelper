using System.Collections.Generic;
using System.Threading.Tasks;
using DezynfectionHelper.Extenstions;
using DezynfectionHelper.NHibernate.Services;
using DezynfectionHelper.Planer.Dto;
using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
using DezynfectionHelper.Planer.Repositories;
using DezynfectionHelper.Users.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DezynfectionHelper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class PlanerController : ControllerBase
    {
        private readonly IPlanerRepository repo;
        private readonly IUnitOfWork uow;
        private readonly IUsersRepository usersRepo;

        public PlanerController(IPlanerRepository repo, IUnitOfWork uow, IUsersRepository usersRepo)
        {
            this.repo = repo;
            this.uow = uow;
            this.usersRepo = usersRepo;
        }

        [HttpPost]
        public async Task Save([FromBody] PlanerItemsParams param)
        {
            var planerItems = new PlanerItems()
            {
                Name = param.Name,
                Objects = param.Objects,
                Room = param.Room,
                UserAccount = await usersRepo.GetByIdAsync(HttpContext.User.GetId()),
            };

            await repo.AddAsync(planerItems);
            await uow.CommitAsync();
        }

        [HttpGet]
        public async Task<PlanerItemsDto> Get([FromQuery] int id)
        {
            var items = await repo.GetByIdAsync(id);
            var planerItemsDto = new PlanerItemsDto
            {
                Id = items.Id,
                Name = items.Name,
                Objects = items.Objects,
                Room = items.Room,
            };

            return planerItemsDto;
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
