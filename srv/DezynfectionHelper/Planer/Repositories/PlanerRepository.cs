using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DisinfectionHelper.Exceptions;
using DisinfectionHelper.Planer.Models;
using NHibernate;
using NHibernate.Linq;

namespace DisinfectionHelper.Planer.Repositories
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

            planerItems = await session.Query<PlanerItems>()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (planerItems == null)
            {
                throw new EntityNotFoundException(typeof(PlanerItems), id);
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
