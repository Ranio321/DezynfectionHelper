using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
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

        public PlanerRepository(ISession sessionFactory)
        {
            this.session = sessionFactory;
        }

        public async Task AddAsync(PlanerItemsParams param)
        {
            var planerItems = new PlanerItems()
            {
                Name = "test",
                Objects = param.Objects,
                Room = param.Room,
            };
            await session.SaveOrUpdateAsync(planerItems);
        }

        public async Task<List<PlanerItems>> GetAllAsync()
        {
            return new List<PlanerItems>();
        }

        public async Task<PlanerItems> GetByIdAsync(int id)
        {
            return new PlanerItems();
        }
    }

}
