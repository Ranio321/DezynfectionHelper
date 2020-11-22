using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezynfectionHelper.Exceptions;
using DezynfectionHelper.Planer.Models;
using NHibernate;
using NHibernate.Linq;

namespace DezynfectionHelper.Planer.Repositories
{
    public class PlanerRepository : IPlanerRepository
    {
        private readonly ISession session;

        public PlanerRepository(ISession session)
        {
            this.session = session;
        }

        public async Task AddAsync(PlanerItems param)
        {
            await session.SaveOrUpdateAsync(param);
        }

        public async Task<List<PlanerItems>> GetAllAsync()
        {
            return await session.Query<PlanerItems>()
                .Select(s => new PlanerItems()
                {
                    Id = s.Id,
                    Name = s.Name,
                    Objects = s.Objects,
                    Room = s.Room,
                }).ToListAsync();
        }

        public async Task<PlanerItems> GetByIdAsync(int id)
        {
            PlanerItems planerItems;
            try
            {
                planerItems = await session.Query<PlanerItems>()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                throw new EntityNotFoundException(typeof(PlanerItems), id, e);
            }

            return planerItems;
        }

        public async Task DeleteAsync(int id)
        {
            var planerItem = await GetByIdAsync(id);
            if (planerItem != null)
            {
                 await session.DeleteAsync(planerItem);
            }
            else
            {
                throw new EntityNotFoundException(typeof(PlanerItems), id);
            }
        }

        public async Task UpdateAsync(PlanerItems items)
        {
            await session.MergeAsync(items);
        }
    }
}
