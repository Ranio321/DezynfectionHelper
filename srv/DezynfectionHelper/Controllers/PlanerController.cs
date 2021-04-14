﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DezynfectionHelper.Planer.Params;
using DisinfectionHelper.Extenstions;
using DisinfectionHelper.NHibernate.Services;
using DisinfectionHelper.Planer.Dto;
using DisinfectionHelper.Planer.Models;
using DisinfectionHelper.Planer.Params;
using DisinfectionHelper.Planer.Repositories;
using DisinfectionHelper.Users.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DisinfectionHelper.Controllers
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
        public async Task Save(PlanerItemsParams param)
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
        public async Task<PlanerItemsDto> Get(BasicPlanerParams param)
        {
            var items = await repo.GetByIdAsync(param.Id);
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
        public async Task Delete(BasicPlanerParams param)
        {
            await repo.DeleteAsync(param.Id);
            await uow.CommitAsync();
        }

        [HttpPut]
        public async Task Update(PlanerItemsParams param)
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
