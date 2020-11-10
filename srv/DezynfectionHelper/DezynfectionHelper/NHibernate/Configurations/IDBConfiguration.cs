using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.NHibernate.Configurations
{
    public interface IDBConfiguration
    {
        ISessionFactory CreateSessionFactory();
    }
}
