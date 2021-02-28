using System;
using System.Threading.Tasks;

namespace DisinfectionHelper.NHibernate.Services
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();
        Task RollbackAsync();
    }
}
