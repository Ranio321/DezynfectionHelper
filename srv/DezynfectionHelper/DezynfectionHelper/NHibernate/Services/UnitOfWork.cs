using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISession = NHibernate.ISession;

namespace DezynfectionHelper.NHibernate.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ISession session;
        private readonly ITransaction transaction;

        public UnitOfWork(ISession session)
        {
            this.session = session;
            transaction = session.BeginTransaction();
        }

        public async Task CommitAsync()
        {
            await transaction.CommitAsync();
        }

        public async Task RollbackAsync()
        {
            await transaction.RollbackAsync();
        }

        public void Dispose()
        {
            if (transaction != null)
            {
                transaction.Dispose();
            }

            session.Dispose();
        }
    }
}
