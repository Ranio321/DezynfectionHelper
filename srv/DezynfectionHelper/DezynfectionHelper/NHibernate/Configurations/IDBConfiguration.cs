using NHibernate;

namespace DezynfectionHelper.NHibernate.Configurations
{
    public interface IDBConfiguration
    {
        ISession CreateSession();
    }
}
