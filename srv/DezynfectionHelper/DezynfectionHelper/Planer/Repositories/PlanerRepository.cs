using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
using FluentNHibernate.Conventions;
using NHibernate;
using NHibernate.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Repositories
{
    public class PlanerRepository : IPlanerRepository
    {
        private readonly ISession session;

        public PlanerRepository(ISession session)
        {
            this.session = session;
        }

        public async Task AddAsync(PlanerItemsParams param)
        {
            var planerItems = new PlanerItems()
            {
                Name = param.Name,
                Objects = param.Objects,
                Room = param.Room,
            };

            await session.SaveOrUpdateAsync(planerItems);
        }

        public async Task<List<PlanerItems>> GetAllAsync()
        {
            return await session.Query<PlanerItems>().ToListAsync();
        }

        public async Task<PlanerItems> GetByIdAsync(int id)
        {
            return await session.Query<PlanerItems>()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var planerItem = await GetByIdAsync(id);
            if (planerItem != null)
            {
                await session.DeleteAsync(planerItem);
            }
        }
    }

}
