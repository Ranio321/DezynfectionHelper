using DezynfectionHelper.Planer.Models;
using DezynfectionHelper.Planer.Params;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Repositories
{
    public class PlanerRepository : IPlanerRepository
    {
        private ISessionFactory sessionFactory;

        public PlanerRepository(ISessionFactory sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public async Task AddAsync(PlanerItemsParams param)
        {
            var planerItems = new PlanerItems()
            {
                Name = "test",
                Objects = param.Objects,
                Room = param.Room,
            };

            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(planerItems);
                    transaction.Commit();
                }
            }
        }
    }
}
