using System.Threading.Tasks;
using NHibernate;
using ISession = NHibernate.ISession;

namespace DisinfectionHelper.NHibernate.Services
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
