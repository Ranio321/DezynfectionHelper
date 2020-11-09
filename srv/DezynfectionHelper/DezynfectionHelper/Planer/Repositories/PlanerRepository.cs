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
        ISessionFactory sessionFactory;

        public PlanerRepository(ISessionFactory sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public async Task AddAsync(PlanerItemsParams param)
        {
            using (var session = sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {

                }
            }
        }
    }
}
