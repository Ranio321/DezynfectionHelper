using System;
using System.Threading.Tasks;

namespace DezynfectionHelper.NHibernate.Services
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();
        Task RollbackAsync();
    }
}
