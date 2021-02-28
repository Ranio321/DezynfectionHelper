using NHibernate;

namespace DisinfectionHelper.NHibernate.Configurations
{
    public interface IDBConfiguration
    {
        ISession CreateSession();
    }
}
